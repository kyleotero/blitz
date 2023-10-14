cards = [
    {
        "name": "Triangle world elite mastercard",
        "Restaurants":1,
        "Grocery_Stores": 3,
        "travel": 4,
        "gas": 0,
        "other": 1,
        "override": {
            "canadian tire gas": 5,
            "Canadian Tire": 4,
            "Sport Chek": 4,
            "Mark's": 4,
            "L'Équipeur": 4,
            "Party City": 4,
            "Pro Hockey Life": 4,
            "Atmosphere": 4,
            "Sports Rousseau": 4,
            "Hockey Experts": 4,
            "L’Entrepôt du Hockey": 4,
            "Costco":0,
            "Walmart":0,
            "shoppers": 4.5,
            "nofrills": 4,
        },
    },
    {
        "name": "PC Financial World Elite",
        "Grocery":3,
        "restaurant":1,
        "gas": 0,
        "travel": 3,
        "other": 1,
        "override": {
            "esso": 3,
            "mobil": 4,
        },
    },

    {
         "Name":"AMEX Cobalt",
         "Grocery": 1,
         "restaurants": 5,
         "Entertanment": 3,
         "Travel", 2
         "Other":1,
         "override": {
             "Loblaws": 0,
             "Shoppers": 0,
             "Costco":0,
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
