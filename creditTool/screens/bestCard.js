import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

export default function bestCard() {
  const [location, setLocation] = useState();
  const [temp, setTemp] = useState(null);

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
            name: "amex cobalt",
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

      console.log(url, latitude, longitude);

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
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
      <Text>Output: {temp}</Text>
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
