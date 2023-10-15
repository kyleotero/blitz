import BestCard from "./screens/BestCard";
import Home from "./screens/Home";
import ManageCards from "./screens/ManageCards.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card Manager"
          component={ManageCards}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card Recommendation"
          component={BestCard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
