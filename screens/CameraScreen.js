import React, { useRef, useEffect } from 'react'
import { Camera } from 'expo-camera';
import { useState } from 'react';
import { Pressable, StyleSheet, View, Text, ImageBackground } from 'react-native';

const CameraPreview = ({photo}) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      />
    </View>
  )
}

const CameraScreen = () => {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  useEffect(() => {
    (async () => {
      requestPermission();
    })();
  }, []);

  if (!permission?.granted) {
    // Display some message to the user indicating that camera permissions are required
    return <Text>No access to camera</Text>;
  }

  

  const handleTakePicture = async ()=> {
    const options = { quality: 0.5, base64: true, skipProcessing: true };
    const photo = await cameraRef.current.takePictureAsync(options)
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  

  
  return (
    
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
      <Camera
       ref={cameraRef} 
      style={{flex:1, width: "100%"}}
      >

      <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleTakePicture}><Text>+</Text></Pressable>
        </View>
      </Camera>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  
},
buttonContainer:{
  position: "absolute",
  width: 70,
  bottom: 10,
 
  alignSelf: 'center',

  
},
button: {
  padding: 20,
  borderRadius: 50,
  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  width: 70
}
})

export default CameraScreen
