import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

export default function App() {
  const [location, setLocation] = useState();

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

  let latitude = null;
  let longitude = null;
  if (location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  const url = `http://127.0.0.1:5000/get_cards`;
  const data = {
    lat: latitude,
    long: longitude,
    cards: [
      {
        status: true,
        name: "amex cobalt",
        food: 3,
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
        food: 3,
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

  console.log(url);
  axios
    .post(url, data)
    .then((response) => {
      // Handle the response data
      console.log("Response:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
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
});
