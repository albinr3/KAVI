import { AntDesign } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, View,TextInput, Pressable, FlatList, Image, Keyboard, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { myContext } from '../navigation/ContextProvider';
import * as FileSystem from 'expo-file-system';


export default function Expenses({navigation, route}) {
  
  const { photo } = route.params || {}; // Destructuring with default value
  console.log("this is the photo param", photo)
  
  const [inputFocused, setInputFocused] = useState(false);
  const [inputFocused2, setInputFocused2] = useState(false);
  const [account, setAccount] = useState("Not selected");
  const [opened, setOpened] = useState(false);
  const [date, setDate] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [objectDate, setObjectDate] = useState({});
  const [ready, setReady] = useState(true);
  const {photoContext, setPhotoContext} = useContext(myContext) || "";
  console.log("nuevaaa", photoContext)
  

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const afterTomorrow = new Date(today);
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    const formatShortDate = (date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}`;
  };

    const longToday = formatDate(today);
    const shortToday = formatShortDate(today);
    const shortTomorrow = formatShortDate(tomorrow);
    const shortAfter = formatShortDate(afterTomorrow);

    setDate(longToday)

    setObjectDate(
        {longToday,
        shortToday,
        shortTomorrow,
        shortAfter}
    );
    
  }, [])

  const [categories, setCategories] = useState([
    { id: "1", name: "health", icon: require("../src/heart.png") },
    { id: "2", name: "Leisure", icon: require("../src/wallet.png") },
    { id: "3", name: "Home", icon: require("../src/house.png") },
    { id: "4", name: "health", icon: require("../src/heart.png") },
    { id: "5", name: "Leisure", icon: require("../src/wallet.png") },
    { id: "6", name: "Home", icon: require("../src/house.png") },
    { id: "7", name: "health", icon: require("../src/heart.png") },
    { id: "8", name: "Leisure", icon: require("../src/wallet.png") },
  ]);
 
  // Sample data for date selection buttons
  const dates = [
    { id: 1, date: objectDate.shortToday, label: 'Today' },
    { id: 2, date: objectDate.shortTomorrow, label: 'Tomorrow' },
    { id: 3, date: objectDate.shortAfter, label: 'Day after tomorrow' }
  ];

  const onFocusInput = () => {
    setInputFocused(true);
  }

  const onFocusInput2 = () => {
    setInputFocused2(true);
  }

  const onBlurInput = () => {
    setInputFocused(false);
  }

  const onBlurInput2 = () => {
    setInputFocused2(false);
  }

  const handleModal = () => {
    
    setOpened(!opened)
  }

  const handleDate = (propDate) => {
    console.log(propDate)
    setDate(propDate)
  }

  // Function to handle date selection for a specific button
  const handleDateSelected = (id) => {
    // If the same button is pressed again, reset its state
    if (dateSelected === id) {
      setDateSelected(null);
    } else {
      // Otherwise, set the new button as selected
      setDateSelected(id);
    }
  }

  const handleCategorySelected = (id) => {
    // If the same button is pressed again, reset its state
    if (categorySelected === id) {
      setCategorySelected(null);
    } else {
      // Otherwise, set the new button as selected
      setCategorySelected(id);
    }
  }

  async function deleteImage(imageUri) {
    try {
      await FileSystem.deleteAsync(imageUri);
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  const handleDeletePhoto = (image)=> {
    
      if (image == 1 && photoContext.image1) {
        const updatedPhotoContext = {...photoContext};
        delete updatedPhotoContext.image1;
        deleteImage(photoContext.image1)
        setPhotoContext(updatedPhotoContext)
      } else if (image == 2 && photoContext.image2) {
        const updatedPhotoContext = {...photoContext};
        delete updatedPhotoContext.image2
        deleteImage(photoContext.image2)
        setPhotoContext(updatedPhotoContext)
      }
  }

  const camera = async () => {
    console.log("hola");
    const result = await launchCamera();
    return result;
  }

  const dateModal = () => {
    return (
      
      <Modal
      animationType='slide'
      transparent={true}
      visible={opened}
      >
        <Pressable style={styles.modalContainer} onPress={handleModal}>
          <Pressable 
          style={styles.modalInnerContainer} 
          onPress={(e) => {
          e.stopPropagation(); // Prevent the event from bubbling up 
          }} >
            <DatePicker 
            mode='calendar'
            selected={date}
            onDateChange={handleDate}
            options={{mainColor: 'green'}}
            />
            <Pressable onPress={handleModal} style={{padding: 10, backgroundColor: "#adff00", borderRadius: 20}}>
                <Text style={{fontSize: 16}}>Select</Text>
            </Pressable>
          </Pressable>
          
        </Pressable>
        
      </Modal>
      
    )
  }

  const renderCategories = (item) => {
    return (
      <Pressable 
      onPress={() => handleCategorySelected(item.id)} 
      style={[categorySelected == item.id && {backgroundColor: "green", borderRadius: 10}]}>
        <View style={styles.itemContainer}>
          <Image 
            style={styles.categoryIcon}
            source={item.icon}
          />
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    )
  }

  const renderDateSection = () => {
    return(
      <View style={styles.dateSectionContainer}>
        <View style={styles.dateSelectionContainer}>
        {dates.map(date => (
          <Pressable 
            key={date.id} 
            onPress={() => handleDateSelected(date.id)} 
            style={[dateSelected==date.id && {backgroundColor: "green"}, styles.dateSelectionBtn]}
          >
            <Text style={[dateSelected==date.id && {color: "white"}, styles.datesText]}>{date.date}</Text>
            <Text style={[dateSelected==date.id && {color: "white"}, styles.datesLabel]}>{date.label}</Text>
          </Pressable>
        ))}
        </View>
        <Pressable onPress={handleModal} style={styles.calendarBtn}>
          <AntDesign name="calendar" size={40} color="black" />
        </Pressable>
      </View>
    )
  }

  const renderComment = () => {
    return(
      <View>
        <Text style={styles.commentText}>Comment</Text>
        <TextInput 
        style={[styles.commentInput, { borderBottomColor: inputFocused2 ? '#adff00' : '#afba96' }]} 
        placeholder='Comment'
        onFocus={onFocusInput2}
        onBlur={onBlurInput2}
        />
      </View>
    )
  }

  const renderPhoto = () => {
    return(
      <View>
        <Text style={styles.photoText}>Photo</Text>
        <View style={{flexDirection: "row"}}>
          {photoContext.image1 ? 
          (<ImageBackground style={styles.savedImage} source={{uri: photoContext.image1}}>
            
            <View style={{
              position: 'absolute', 
              top: 0,
              right: 0,
              width: 25,
              height: 25,
              justifyContent: "center",
              alignItems: "center"
              }}>
              <Pressable onPress={() => handleDeletePhoto(1)} style={{ backgroundColor: "black", borderRadius: 50}}>
                <AntDesign name="closecircle" size={20} color="white" />
              </Pressable>
            </View>
            </ImageBackground>
            )
          
          :
          (<Pressable 
          onPress={() => navigation.navigate("CameraScreen")} 
          style={styles.photoBtn}>
            <AntDesign name="plus" size={32} color="white" />
          </Pressable>)

          }
          {photoContext.image2 ? 
          (<ImageBackground style={styles.savedImage} source={{uri: photoContext.image2}}>
            
            <View style={{
              position: 'absolute', 
              top: 0,
              right: 0,
              width: 25,
              height: 25,
              justifyContent: "center",
              alignItems: "center"
              }}>
              <Pressable onPress={() => handleDeletePhoto(2)} style={{ backgroundColor: "black", borderRadius: 50}}>
                <AntDesign name="closecircle" size={20} color="white" />
              </Pressable>
            </View>
            </ImageBackground>
            )
          
          :
          (<Pressable 
          onPress={() => navigation.navigate("CameraScreen")} 
          style={styles.photoBtn}>
            <AntDesign name="plus" size={32} color="white" />
          </Pressable>)

          }
        </View>
      </View>
    )
  }

  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        
          <Pressable 
          disabled = {ready}
          onPress={()=> console.log("holaaaa")}
          style={[styles.addButton, ready ? {backgroundColor: "rgba(255, 165, 0, 0.5)",} : styles.shadowStyle ]}>

            <Text style={{fontSize: 18, color: "white"}}>Add</Text>

          </Pressable>
       
      </View>
    )
  }


    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput  
          inputMode={'numeric'} 
          textAlign={"center"} 
          style={[styles.input, { borderBottomColor: inputFocused ? '#adff00' : '#afba96' }]}
          placeholder='0'
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          />
          <Text style={styles.currencyText}>DOP</Text>
        </View>
        
        <Pressable onPress={()=> {Keyboard.dismiss()}}>
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Account</Text>
            <Pressable><Text style={styles.selectText}>{account}</Text></Pressable>
          </View>
          <Text style={styles.categoriesText}>Categories</Text>
          <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
          {categories.map(item => (
            <View style={{}} key={item.id}>
              {renderCategories(item)}
            </View>
          ))}
          </View>
          {renderDateSection()}
          {renderComment()}
          {renderPhoto()}
          <View style={{padding: 48}}></View>
          
          {dateModal()}
        </Pressable>
        </ScrollView>
        {renderButton()}
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    tabContainer: {
      
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      height: 70,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 4,
    },
    contentContainer: {
      backgroundColor: "white",
      flex: 1
    },
    container: {
      flex: 1
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    input: {
      padding: 10,
      borderBottomWidth: 3,
      width: 180,
      fontSize: 28
    },
    currencyText: {
      fontSize: 24,
      color: "green"
    },
    accountContainer: {
      marginTop: 40,
      marginLeft: 20
    },
    accountText: {
      fontSize: 16
    },
    selectText: {
      color: "green",
      fontSize: 20
    },
    categoriesText: {
      marginVertical: 20,
      marginLeft: 20, 
      fontSize: 16
    },
    categoryIcon: {
      width: 75, 
      height: 75
    },
    itemContainer: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      padding: 10
    },
    modalContainer: {
      marginTop: 22,
      flex: 1,
      justifyContent: "center"
    },
    modalInnerContainer: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      width: "90%",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    dateSectionContainer: {
      flexDirection: "row",
      padding: 10,
      justifyContent: "space-between"
    },
    dateSelectionContainer: {
      flexDirection: "row",
      flex: 2
    },
    dateSelectionBtn: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignItems: "center",
      borderRadius: 12
    },
    datesText: {
      fontSize: 18
    },
    datesLabel: {
      fontSize: 12
    },
    calendarBtn: {
      padding: 8
      
    },
    commentInput: {
      padding: 6,
      borderBottomWidth: 3,
      width: "90%",
      fontSize: 16,
      marginLeft: 15,
     
      
    },
    commentText: {
      marginLeft: 20, 
      fontSize: 16
    },
    photoBtn: {
      padding: 40,
      backgroundColor: "gray",
      margin: 12,
      borderRadius: 12

    },
    photoText: {
      marginLeft: 20, 
      marginTop: 16,
      fontSize: 16
    },
    addButton: {
      
      width: "70%",
      height: 60,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "orange",
      
    },
    buttonContainer: {
      position: 'absolute',  
      left: 0, 
      right: 0, 
      bottom: 10, 
      justifyContent: 'center', 
      alignItems: 'center',
      
    },
    addButtonInnerContainer: {
      width: "70%",
      height: 60,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    shadowStyle : {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3, // Keep the shadow for Android
    },
    savedImage: {
      margin: 12,
      borderRadius: 12,
      width: 120,
      height: 120
    },
    categoryBtn: {
      backgroundColor: "green"
    }

  });