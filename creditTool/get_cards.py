from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/get_cards', methods=['GET'])
def get_cards():
    print("Received a GET request for cards")
    
    latitude = request.args.get('lat')
    longitude = request.args.get('long')
    print(f'Latitude: {latitude}, Longitude: {longitude}')

    # Your logic to use latitude and longitude
    # ...

    # Return some response
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
