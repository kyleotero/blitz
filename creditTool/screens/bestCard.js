import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";
import pcimg from "../assets/pc.png";
import triangleimg from "../assets/triangle.png";
import cibcimg from "../assets/cibc.png";
import ameximg from "../assets/amex.png";
import scotiaimg from "../assets/scotia.png";
import { useFonts } from "expo-font";

export default function BestCard({ navigation }) {
  const [loaded] = useFonts({
    Roboto: require("../assets/Roboto/Roboto-Medium.ttf"),
  });

  const [location, setLocation] = useState();
  const [temp, setTemp] = useState(null);

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

      const url = `http://10.0.2.2:5000/get_cards`;
      const data = {
        lat: latitude,
        long: longitude,
        cards: [
          {
            status: true,
            name: "AMEX Cobalt",
            restaurant: 3,
            sport_stores: 4,
            travel: 4,
            gas: 5,
            groceries: 3,
            other: 1,
            override: {
              shoppers: 4.5,
              nofrills: 4,
            },
          },
          {
            status: true,
            name: "PC Financial World Elite",
            restaurant: 3,
            gas: 3,
            groceries: 6,
            travel: 3,
            other: 1,
            override: {
              esso: 65,
              dick: 4,
            },
          },
        ],
      };

      axios
        .post(url, data)
        .then((response) => {
          // Handle the response data
          console.log("Response:", response.data);
          setTemp(response.data["value"]);
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
          <Text style={{ fontFamily: "Roboto", fontSize: 18 }}>
            Your best card for this purchase is the
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 18 }}>
            {temp[0] + " with a " + temp[1] + "% cashback!"}
          </Text>
          <View style={styles.imageWrapper}>
            <Image
              source={images[temp[0]]}
              style={styles.pic}
              resizeMode="contain"
            />
            <Button
              title="To card "
              onPress={() => navigation.navigate("Home")}
            ></Button>
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
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 10 }, // Offset (x, y)
    shadowOpacity: 1, // Opacity (0 to 1)
    shadowRadius: 10, // Radius
    padding: 16,
  },
  pic: {
    maxWidth: 250, // Maximum width
    maxHeight: 140, // Maximum height
    // width: "100%", // Set the width to 100% to ensure it fits within the maxWidth
  },
});
