import React from 'react'
import { Pressable, Text } from 'react-native'

const Home = ({navigation}) => {
  return (
    <>
      <Pressable 
      style={{padding: 10, backgroundColor: "red"}} 
      onPress={()=>navigation.navigate("AddTransactions")}>
        <Text>Ir a transacciones</Text>
      </Pressable>
    </>
  )
}

export default Home