import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import TopTabs from '../screens/AddTransactions';
import Home from '../screens/Home';
import CameraScreen from '../screens/CameraScreen';
import ContextProvider from './ContextProvider';
import PayJob from '../screens/PayJob';
import PayRoll from '../screens/PayRoll';

const Stack = createNativeStackNavigator();



const AppNavigation = () => {
  return (
    <ContextProvider>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: "green"},headerTintColor: "white"}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="AddTransactions" component={TopTabs}/>
            <Stack.Screen name="PayJob" component={PayJob}/>
            <Stack.Screen name="PayRoll" component={PayRoll}/>
            <Stack.Screen name="CameraScreen" component={CameraScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    </ContextProvider>
  )
}


export default AppNavigation
