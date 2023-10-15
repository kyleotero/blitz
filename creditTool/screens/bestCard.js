import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import pcimg from "../assets/pc.png";
import triangleimg from "../assets/triangle.png";
import cibcimg from "../assets/cibc.png";
import ameximg from "../assets/amex.png";
import scotiaimg from "../assets/scotia.png";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BestCard({ navigation }) {
  const [cards, setCards] = useState([]);

  async function get_cards() {
    const temp = await AsyncStorage.getItem("cards");
    setCards(JSON.parse(temp));
  }

  get_cards();

  const [] = useFonts({
    Robotothin: require("../assets/Roboto/Roboto-Thin.ttf"),
    Robotomed: require("../assets/Roboto/Roboto-Medium.ttf"),
  });

  const [location, setLocation] = useState();
  const [temp, setTemp] = useState(null);
  const [store, setStore] = useState();

  const images = {
    "PC Financial World Elite": pcimg,
    "Triangle World Elite": triangleimg,
    "CIBC Student Cashback": cibcimg,
    "AMEX Cobalt": ameximg,
    "Scotia Momentum Infinite": scotiaimg,
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };

    getPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location.coords;

      const newcards = require("./cards.json");
      for (const [key, value] of Object.entries(cards)) {
        for (var j = 0; j < newcards.length; j++) {
          if (value["active"] == true && key == newcards[j]["name"]) {
            newcards[j]["active"] = true;
          } else if (value["active"] == false && key == newcards[j]["name"]) {
            newcards[j]["active"] = false;
          }
        }
      }
      console.log("\n\n\n\n", newcards);

      const url = `http://127.0.0.1:5000/get_cards`;
      const data = {
        lat: latitude,
        long: longitude,
        cards: newcards,
      };

      axios
        .post(url, data)
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
          setTemp(response.data["value"]);
          setStore(response.data["store"]);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {temp && temp.length > 0 ? (
        <>
          <Text style={{ fontFamily: "Robotomed", fontSize: 24, bottom: 80 }}>
            It looks like you're at {store}!
          </Text>
          <Text style={{ fontFamily: "Robotomed", fontSize: 18 }}>
            Your best card for this purchase is the
          </Text>
          <Text style={{ fontFamily: "Robotomed", fontSize: 18 }}>
            {temp[0] + " with a " + temp[1] + "% cashback!"}
          </Text>
          <View style={styles.imageWrapper}>
            <Image
              source={images[temp[0]]}
              style={styles.pic}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              title="To card "
              style={styles.button}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    shadowColor: "black", // Shadow colo
    shadowOffset: { width: 0, height: 10 }, // Offset (x, y)
    shadowOpacity: 0.7, // Opacity (0 to 1)
    shadowRadius: 20, // Radius
    padding: 16,
  },
  pic: {
    maxWidth: 250, // Maximum width
    maxHeight: 140, // Maximum height
    // width: "100%", // Set the width to 100% to ensure it fits within the maxWidth
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 150,
    marginTop: 30,
    height: 50,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    color: "black",
    fontSize: 22,
  },
});
