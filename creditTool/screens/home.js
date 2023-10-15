import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import homeImage from "../assets/homeImage.png";
import homeBg from "../assets/homeBg.png";
import { useFonts } from "expo-font";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={homeBg} style={styles.homeBg} resizeMode="cover" />

      <View style={styles.contentContainer}>
        <View style={styles.textOverlay}>
          <Text style={styles.blitzText}>Blitz</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.titleText}>Through the checkout</Text>
          <Text style={styles.subText}>Pick the best credit card</Text>
          <Image source={homeImage} style={styles.image} resizeMode="contain" />
        </View>

        <TouchableOpacity
          style={styles.buttonCard}
          onPress={() => navigation.navigate("Card Recommendation")}
        >
          <Text style={styles.buttonText}>Best Card</Text>
        </TouchableOpacity>

        <View style={styles.bottomButton}>
          <View style={styles.buttonManage}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Card Manager")}
            >
              <Text style={styles.buttonText}>Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  homeBg: {
    minWidth: 400,
    minHeight: 210,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  textOverlay: {
    position: "absolute",
    top: 0, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
    right: 10, // Adjust the right position as needed
    alignItems: "center",
    
  },
  titleText: {
    fontSize: 30,
  },
  blitzText: {
    textAlign: 'center',
    fontSize: 130, // You can adjust the style of the "blitz" text
    color: "white", // Set the text color
    fontWeight: "400",
  },
  bottomButton: {
    paddingBottom: 7,
  },
  subText: {
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    maxWidth: 280,
    maxHeight: 280,
    minWidth: 220,
    minHeight: 220,
    marginBottom: 5,
  },
  buttonCard: {
    width: 240,
    height: 75,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 10, // Set the elevation for Android shadow
  },
  buttonManage: {
    width: 240,
    height: 75,
    margin: 10,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    elevation: 10, // Set the elevation for Android shadow
  },
  buttonText: {
    fontSize: 45,
    fontWeight: "600",
    color: "#000",
  },
});
