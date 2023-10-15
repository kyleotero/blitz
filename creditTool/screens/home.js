import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import homeImage from "../assets/homeImage.png";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
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
          <Text style={styles.buttonText}>Go!</Text>
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
  textOverlay: {
    position: "absolute",
    top: 0, // Adjust the top position as needed
    left: 10, // Adjust the left position as needed
    right: 10, // Adjust the right position as needed
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    bottom: 90,
  },
  blitzText: {
    textAlign: "center",
    top: 100,
    fontSize: 130, // You can adjust the style of the "blitz" text
    color: "black", // Set the text color
    fontWeight: "400",
  },
  bottomButton: {
    paddingBottom: 7,
  },
  subText: {
    fontSize: 16,
    bottom: 90,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: "black",
    borderRadius: 10,
  },
  image: {
    maxWidth: 280,
    maxHeight: 280,
    minWidth: 220,
    minHeight: 220,
    marginBottom: 5,
    bottom: 60,
  },
  buttonCard: {
    width: 180,
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    bottom: 40,
    elevation: 10, // Set the elevation for Android shadow
    borderColor: "black",
    borderWidth: 2,
  },
  buttonManage: {
    width: 180,
    height: 60,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    bottom: 30,
    elevation: 10, // Set the elevation for Android shadow
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 30,
    color: "black",
  },
});
