import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, TextInput, Text } from 'react-native';

export default function RegisterEmployee() {

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [money, setMoney] = useState("");

  return (
    <SafeAreaView style={styles.container}>
        <TextInput 
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nombre"
        />
        <TextInput 
            style={styles.input}
            onChangeText={setTel}
            value={tel}
            placeholder="Telefono"
        />
        <TextInput 
            style={styles.input}
            onChangeText={setMoney}
            value={money}
            placeholder="Sueldo"
        />

        <Pressable style={styles.button}>
          <Text>Registrar</Text>
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    width: 200
  },
  button: {
    padding: 5,
    backgroundColor: "green",
    width: 100,
    height: 40,

    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
})
