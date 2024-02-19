import React, {useContext} from 'react'
import { Pressable, Text } from 'react-native'
import { myContext } from '../navigation/ContextProvider'
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
      onPress={()=>navigation.navigate("PayJob")}>
        <Text>Ir a pagos</Text>
      </Pressable>
    </>
  )
}

export default Home
