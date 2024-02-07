import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Expenses from './Expenses';
import Income from './Income';


const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
    return (
      <Tab.Navigator screenOptions={{
        tabBarLabelStyle: { fontSize: 16, color: "white"},
        tabBarStyle:{
          backgroundColor: "green", 
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "white", 
          height: 5, 
          marginRight: 15,
          marginLeft: 18,
          borderRadius: 20,
          width: "38%"
        },
        
      }}>
        <Tab.Screen name="Expenses" component={Expenses} />
        <Tab.Screen name="Income" component={Income} />
      </Tab.Navigator>
    );
  }

