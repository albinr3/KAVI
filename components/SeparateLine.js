import React from 'react'
import { StyleSheet, View } from 'react-native'


const SeparateLine = ({thin}) => {
  return (
    <View style={thin ? styles.separateLine2 : styles.separateLine} />
  )
}

const styles = StyleSheet.create ({
    separateLine: {
        marginVertical: 7,
        borderBottomWidth: .3,
        borderBottomColor: "#A0A5BA",
        width: "100%"
    },
    separateLine2: {
      marginTop: 10,
      borderBottomWidth: .3,
      borderBottomColor: "#EDEDED",
      width: "100%"
  }
})

export default SeparateLine
