import json
from flask import Flask, jsonify, request
import requests
import openai
from decouple import config

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/get_cards": {"origins": "10.0.2.2:5000"}})

api_key = config("google")
blacklist = {
    "sublocality_level_1",
    "sublocality",
    "political",
    "locality",
    "street_address",
    "premise",
    "route",
}

openai.api_key = config("openai")


@app.route("/get_cards", methods=["POST"])
def get_cards():
    data = request.get_json()
    latitude = str(data.get("lat"))
    longitude = str(data.get("long"))
    cards = data.get("cards")

    output = requests.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + latitude
        + "%2C"
        + longitude
        + "&radius=50&key="
        + api_key
    )

    results = json.loads(output.text)["results"]

    place = None

    for result in results:
        if result["types"][0] not in blacklist:
            place = result
            break

    if place is None:
        return {}, 400

    name = place["name"].lower()
    type = place["types"][0]

    if type in blacklist:
        return {}, 400

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": "given a list of business categories: (gas, groceries, restaurant, travel, \
                    entertainment, other) which does the store type "
                + type
                + "' match best? respond with a one \
            word answer with only the item of the list",
            }
        ],
    )

    type = response["choices"][0]["message"]["content"].lower()

    print(type, name)
    res = {"value": best_card(type, name, cards), "store": name}
    print(res)

    return jsonify(res), 200


@app.route("/error_fix", methods=["GET"])
def error_fix():
    return


def best_card(category, store, cards):
    greatest = ("", 0)

    for card in cards:
        if card["active"]:
            if "override" in card and store in card["override"]:
                if card["override"][store] > greatest[1]:
                    greatest = (card["name"], card["override"][store])
                    break

            if category in card:
                if card[category] > greatest[1]:
                    greatest = (card["name"], card[category])
            elif card["other"] > greatest[1]:
                greatest = (card["name"], card["other"])

    return greatest


if __name__ == "__main__":
    app.run()
