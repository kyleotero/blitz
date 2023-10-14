import bestCard from "./screens/bestCard";
import Home from "./screens/home";
import ManageCards from "./screens/manageCards.js";
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
          name="Card Recomendation"
          component={bestCard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
