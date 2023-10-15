import React, { useState, useEffect } from "react";
import {
  StatusBar,
  FlatList,
  StyleSheet,
  Button,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pcImage from "../assets/pc.png";
import scotiaImg from "../assets/scotia.png";
import triImg from "../assets/triangle.png";
import amexImg from "../assets/amex.png";
import cibcImg from "../assets/cibc.png";

export default function ManageCards({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cardsData = [
          {
            cardName: "PC Financial World Elite",
            checked: false,
            imageSource: pcImage,
          },
          {
            cardName: "Scotia Momentum Infinite",
            checked: false,
            imageSource: scotiaImg,
          },
          {
            cardName: "Triangle World Elite",
            checked: false,
            imageSource: triImg,
          },
          { cardName: "AMEX Cobalt", checked: false, imageSource: amexImg },
          {
            cardName: "CIBC Student Cashback",
            checked: false,
            imageSource: cibcImg,
          },
        ];

        const storedCards = await AsyncStorage.getItem("cards");

        if (storedCards !== null) {
          const parsedCards = JSON.parse(storedCards);
          const updatedData = cardsData.map((card) => ({
            ...card,
            checked: parsedCards[card.cardName]?.active || false,
          }));
          setData(updatedData);
        } else {
          setData(cardsData);
        }
      } catch (error) {
        console.error("Error fetching cards from AsyncStorage:", error);
      }
    }

    fetchData();
  }, []);

  const toggleCheckbox = async (cardName) => {
    const updatedData = data.map((item) =>
      item.cardName === cardName ? { ...item, checked: !item.checked } : item
    );

    setData(updatedData);

    try {
      const updatedCards = {};
      updatedData.forEach((card) => {
        updatedCards[card.cardName] = { active: card.checked };
      });
      await AsyncStorage.setItem("cards", JSON.stringify(updatedCards));
    } catch (error) {
      console.error("Error saving cards to AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.cardName.toString()}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleCheckbox(item.cardName)}>
              <View style={styles.imageWrapper}>
                <Image
                  source={item.imageSource}
                  style={[styles.image, { opacity: item.checked ? 1 : 0.3 }]}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Card Recommendation")}
        >
          <Text style={styles.buttonText}>Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 100,
  },
  imageWrapper: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    padding: 8,
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: "transparent", // Change color as needed
    position: "absolute",
    top: 5,
    right: 5,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    position: "absolute",
    top: 100,
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 100,
    marginTop: 30,
    height: 100,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 200,
  },
  buttonText: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: 36,
  },
});
