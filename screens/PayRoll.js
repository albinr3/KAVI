import React, {useState} from 'react'
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, Pressable } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {employeesList} from '../utils/employees'
import EmployeeHeader from '../components/EmployeeHeader'
import SeparateLine from '../components/SeparateLine';
import CalendarPicker from "react-native-calendar-picker";


export default function PayRoll() {
    const {photo, tel, name, salary, id} = employeesList[0]
    const [inputFocused1, setInputFocused1] = useState(false);
    const [opened, setOpened] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);


    //CALENDAR
    /////////////////////////////////
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

    const dateModal = () => {
        return (
          
          <Modal
          animationType='slide'
          transparent={true}
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

    //CUSTOM GRID
    ////////////////////////////////

    
    const handleItemClick = (item) => {
    setSelectedItem(item);
    // Handle item click logic here
    };

    const employees = [
    { name: 'Employee 1', schedule: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
    { name: 'Employee 2', schedule: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] },
    // Add more employees as needed
    ];

    const HeaderItem = ({ title }) => (
        <View style={styles.headerItem}>
          <Text>{title}</Text>
        </View>
    );

    const GridItem = ({ onPress, text }) => (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.gridItem}>
            <Text>{text}</Text>
        </View>
        </TouchableWithoutFeedback>
    );

    const customGrid = () => (
        <View style={styles.container}>
        <View style={styles.header}>
        <HeaderItem title="Employee" />
        {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day, index) => (
            <HeaderItem key={index} title={day} />
        ))}
        </View>
        {employees.map((employee, index) => (
        <View key={index} style={styles.row}>
            <GridItem onPress={() => handleItemClick(employee.name)} text={employee.name} />
            {employee.schedule.map((day, index) => (
            <GridItem key={index} onPress={() => handleItemClick(`${employee.name} - ${day}`)} text={day} />
            ))}
        </View>
        ))}
    </View>
    );

  return (
    <SafeAreaView style={styles.container}>
        {customGrid()}
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 255, 0, 0.1))",
      },
      modalInnerContainer: {
        
        backgroundColor: "white",
        borderRadius: 20,
        width: "100%",
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

      header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
      },
      row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
      },
      headerItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
      gridItem: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
})
