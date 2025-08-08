<<<<<<< Updated upstream
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
=======
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './Navigation/AppNavigator';

export default function App() {
  return (
  <PaperProvider>
    <AppNavigator />
  </PaperProvider>
  );
}
>>>>>>> Stashed changes
