import json
from flask import Flask, jsonify, request
import requests
import openai

app = Flask(__name__)

key = "AIzaSyDV7Tqo-WBrAuFoMD79oYeV3IwPatt9FQM"
blacklist = {
    "sublocality_level_1",
    "sublocality",
    "political",
    "locality",
    "street_address",
    "premise",
}

openai.api_key = "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"


@app.route("/get_cards", methods=["POST"])
def post_handler():
    data = request.get_json()
    latitude = data.get("lat")
    longitude = data.get("long")
    cards = data.get("cards")

    output = requests.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        + latitude
        + "%2C"
        + longitude
        + "&radius=100&key=AIzaSyDV7Tqo-WBrAuFoMD79oYeV3IwPatt9FQM"
    )

    print(output.text)

    results = json.loads(output.text)["results"]

    for result in results:
        print(result["name"], result["types"])
        if result["types"][0] not in blacklist:
            place = result
            break

    name = place["name"]
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

    type = response["choices"][0]["message"]["content"]
    print(type)

    res = {"value": best_card(type, name, cards)}

    return jsonify(res), 200


def best_card(category, store, cards):
    greatest = ("", 0)

    for card in cards:
        print(card)
        if card["status"]:
            if store in card["override"]:
                if card["override"][store] > greatest[1]:
                    greatest = (card["name"], card["override"][store])

            if category in card:
                if card[category] > greatest[1]:
                    greatest = (card["name"], card[category])
            elif card["other"] > greatest[1]:
                greatest = (card["name"], card["other"])

    return greatest


if __name__ == "__main__":
    app.run(debug=True)
