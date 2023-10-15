import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

export default function ManageCards({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="go to best card"
        onPress={() => navigation.navigate("Card Recomendation")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});