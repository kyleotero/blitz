cards = [
    {
        "name": "amex cobalt",
        "food": 3,
        "sport_stores": 4,
        "travel": 4,
        "gas": 5,
        "other": 1,
        "override": {
            "shoppers": 4.5,
            "nofrills": 4,
        },
    },
    {
        "name": "PC Financial World Elite",
        "food": 3,
        "gas": 3,
        "travel": 3,
        "other": 1,
        "override": {
            "esso": 65,
            "dick": 4,
        },
    },
]


def best_card(category, store):
    greatest = ("", 0)

    for card in cards:
        if store in card["override"]:
            if card["override"][store] > greatest[1]:
                greatest = (card["name"], card["override"][store])

        if category in card:
            if card[category] > greatest[1]:
                greatest = (card["name"], card[category])

    return greatest


print(best_card("gas", "esso"))
