import bestCard from "./screens/bestCard";
// import SecondScreen from "./screens/SecondScreen";
// import ThirdScreen from "./screens/ThirdScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name="Home"
         component={bestCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}