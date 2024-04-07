import React, {useContext, useEffect} from 'react'
import { Pressable, Text } from 'react-native'
import { myContext } from '../navigation/ContextProvider'
import axios from 'axios';

const Home = ({navigation}) => {




  return (
    <>
      <Pressable 
      style={{padding: 10, backgroundColor: "red"}} 
      onPress={()=>navigation.navigate("AddTransactions")}>
        <Text>Ir a transacciones</Text>
      </Pressable>

      <Pressable 
      style={{padding: 10, backgroundColor: "blue"}} 
      onPress={()=>navigation.navigate("PayRoll")}>
        <Text>Ir a pagos</Text>
      </Pressable>

      <Pressable 
      style={{padding: 10, backgroundColor: "green"}} 
      onPress={()=>navigation.navigate("RegisterEmployee")}>
        <Text>Ir a registrar empleados</Text>
      </Pressable>
    </>
  )
}

export default Home
