import openai

openai.api_key = "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"

# pull the store from kyle's file instead of this constant var
store = "walmart"
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "user",
            "content": """given a list of business categories: (gas, groceries, restaurant, travel, 
            entertainment, other) which does the store type 'department store' match best? respond with a one 
            word answer with only the item of the list""",
        }
    ],
)

print(response)
