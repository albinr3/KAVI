import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import TopTabs from '../screens/AddTransactions';
import Home from '../screens/Home';
import CameraScreen from '../screens/CameraScreen';
const Stack = createNativeStackNavigator();



const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: "green"},headerTintColor: "white"}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="AddTransactions" component={TopTabs}/>
            <Stack.Screen name="Camera" component={CameraScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation