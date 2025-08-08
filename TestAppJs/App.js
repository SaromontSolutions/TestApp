import { PaperProvider } from 'react-native-paper';
import AppNavigator from './Navigation/AppNavigator';

export default function App() {
  return (
  <PaperProvider>
    <AppNavigator />
  </PaperProvider>
  );
}
