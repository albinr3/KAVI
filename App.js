import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopTabs from './screens/AddTransactions';
import AppNavigation from './navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppNavigation/>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  tabContainer: {
    
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 70,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  contentContainer: {
    backgroundColor: "white",
    flex: 1
  },
  container: {
    flex: 1
  }
});
