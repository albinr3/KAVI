import React, { useRef, useEffect, useState, useContext } from 'react'
import { Camera } from 'expo-camera';
import { Pressable, StyleSheet, View, Text, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { myContext } from '../navigation/ContextProvider';

const CameraPreview = ({photo, navigation}) => {
  

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
        source={{uri: photo}}
        style={{
          flex: 1
        }}
      />

      <View style={styles.buttonContainer}>
        <Pressable
         style={styles.button}
        onPress={() => navigation.navigate("AddTransactions", {screen: "Expenses"})}>

            <Text>Use</Text>

        </Pressable>
      </View>
    </View>
  )
}

const CameraScreen = ({navigation}) => {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const {photoContext, setPhotoContext} = useContext(myContext);

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
    
    setPreviewVisible(true)
    setCapturedImage(photo)
    await handleSavePhoto(photo);
  }

  const handleSavePhoto = async (photo) => {
    if (photo.uri) {
      // Decide on a unique file name, for example with a timestamp
      const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
  
      try {
        // Move the photo from the temporary cache to a persistent file
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri,
        });
        setSavedImage(fileUri);
        if (photoContext.image1) {
          setPhotoContext(image1 => { 
            return {...image1, image2: fileUri}
          })
        } else {
          setPhotoContext({image1: fileUri})
        }
        
        console.log(`Photo saved at ${fileUri}`);
        
        // Optionally, if you want to save to the device's gallery:
        // const asset = await MediaLibrary.createAssetAsync(fileUri);
        // await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
        
      } catch (error) {
        console.error('Error saving photo', error);
      }
    }
  };

  return (
    
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={savedImage} navigation={navigation} />
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
