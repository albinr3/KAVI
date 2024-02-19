import React, {useState} from 'react'
import { StyleSheet, Modal, Text, View, TextInput, Pressable } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {employeesList} from '../utils/employees'
import EmployeeHeader from '../components/EmployeeHeader'
import SeparateLine from '../components/SeparateLine';
import CalendarPicker from "react-native-calendar-picker";


export default function PayJob() {
    const {photo, tel, name, salary, id} = employeesList[0]
    const [inputFocused1, setInputFocused1] = useState(false);
    const [opened, setOpened] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const customDayLabels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const customDayHeaderStyles = () => {
        return {
          style: {justifyContent: 'center', }, // Adjust the marginLeft as needed
          textStyle: { fontSize: 12, textAlign: "center"}, // Optional: adjust the font size
        };
      };


    const onDateChange = (date) => {
        if (startDate && !endDate) {
        setEndDate(date);
        } else {
        setStartDate(date);
        setEndDate(null);
        }
    };

    const onStartChange = (date) => {
        setStartDate(date);
      };

    const start = startDate ? startDate.toString() : '';
    const end = endDate ? endDate.toString() : '';

    const renderSalary = () => (
        
        <View style={styles.salaryContainer}>
            <Text style={styles.textTitle}>Salary</Text>
            <TextInput 
            inputMode='numeric' 
            textAlign={"center"} 
            style={[styles.input]} 
            editable={false} 
            defaultValue={"$" + salary}/>
        </View>
    )

    const dateModal = () => {
        return (
          
          <Modal
          animationType='slide'
          transparent={false}
          visible={opened}
          >
            <Pressable style={styles.modalContainer} >
              <Pressable 
              style={styles.modalInnerContainer} 
              onPress={(e) => {
              e.stopPropagation(); // Prevent the event from bubbling up 
              }} >
                <CalendarPicker
                allowRangeSelection
                onDateChange= {onDateChange}
                onStartChange={onStartChange}
                minRangeDuration={5}
                weekdays={customDayLabels}
                customDatesStyles	={customDayHeaderStyles}

                
                />

                <Text>startDate:{start}
                </Text>
                <Text>endDate: {end}</Text>
              </Pressable>
              
            </Pressable>
            
          </Modal>
          
        )
      }
    

  return (
    <SafeAreaView style={styles.container}>
        <EmployeeHeader photo={photo} tel={tel} name={name}/>
        <SeparateLine/>
        
        {renderSalary()}
        {dateModal()}
    </SafeAreaView>
  )
}
const modalContainerMarginTop = 22;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    salaryContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    textTitle: {
        fontSize: 24,

    },
    input: {
        padding: 10,
        borderWidth: 1,
        width: 180,
        fontSize: 28,
        borderRadius: 6
    },
    modalContainer: {
        marginTop: modalContainerMarginTop,
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
})
