import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from "react-native";

import { DeviceMotion } from 'expo-sensors';
import { SafeAreaView } from "react-native-safe-area-context";
import { employeesList } from "../utils/employees";
import EmployeeHeader from "../components/EmployeeHeader";
import SeparateLine from "../components/SeparateLine";
import CalendarPicker from "react-native-calendar-picker";
import * as ScreenOrientation from "expo-screen-orientation";

export default function PayRoll() {
  const { photo, tel, name, salary, id } = employeesList[0];
  const [inputFocused1, setInputFocused1] = useState(false);
  const [opened, setOpened] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orientation, setOrientation] = useState(null);


  useEffect(() => {

    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    changeScreenOrientation()
  }, []);


  //CUSTOM GRID
  ////////////////////////////////

  const employees = [
    {
      name: "Employee 1",
      schedule: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      salary: 500
    },
    {
      name: "Employee 2",
      schedule: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      salary: 300
    },
    {
      name: "Employee 3",
      schedule: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      salary: 500
    },
    {
      name: "Employee 4",
      schedule: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
      salary: 300
    },
    // Add more employees as needed
  ];


  const handleItemClick = (item) => {
    const employeeName = Object.keys(item)[0];
    const day = item[employeeName][0];
  
    // Encuentra el índice del empleado en selectedItems, si existe
    const existingEmployeeIndex = selectedItems.findIndex((obj) => obj[employeeName]);
  
    if(existingEmployeeIndex >= 0) {
      // Copia el estado actualizado para evitar mutaciones directas
      let updatedSelectedItems = [...selectedItems];
      // Encuentra los días seleccionados actuales para este empleado
      let selectedDays = updatedSelectedItems[existingEmployeeIndex][employeeName];
  
      if(selectedDays.includes(day)) {
        // Elimina el día si ya estaba seleccionado
        selectedDays = selectedDays.filter((d) => d !== day);
      } else {
        // Añade el día si no estaba seleccionado
        selectedDays.push(day);
      }
  
      // Si no hay días seleccionados, elimina el empleado de selectedItems
      if(selectedDays.length === 0) {
        updatedSelectedItems = updatedSelectedItems.filter((_, index) => index !== existingEmployeeIndex);
      } else {
        // Actualiza los días para este empleado
        updatedSelectedItems[existingEmployeeIndex][employeeName] = selectedDays;
      }
  
      setSelectedItems(updatedSelectedItems);
    } else {
      // Añade un nuevo empleado y su día seleccionado si no existía previamente
      setSelectedItems([...selectedItems, {[employeeName]: [day]}]);
    }

    console.log(selectedItems)
  };

  // Calcula los días trabajados para todos los empleados y devuelve un objeto
  const daysWorkedPerEmployee = useMemo(() => {
    // Inicializa un objeto para almacenar los días trabajados por cada empleado
    const days = {};
    // Itera sobre cada empleado en selectedItems y calcula los días trabajados
    selectedItems.forEach((item) => {
      const name = Object.keys(item)[0]; // Obtiene el nombre del empleado
      days[name] = item[name].length; // Almacena la cantidad de días trabajados
    });
    console.log("dias: ", days)
    return days;
  }, [selectedItems]); // Dependencia: recalcular solo cuando selectedItems cambie


  
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

  const GridItemEmpty = ({ onPress, item }) => {

    const isSelected = selectedItems.some(selectedItem => {
      const employeeName = Object.keys(selectedItem)[0];
      return employeeName === Object.keys(item)[0] && selectedItem[employeeName].includes(item[employeeName][0]);
    });
    return(
    <TouchableWithoutFeedback onPress={()=> onPress(item)}>
      <View style={[styles.gridItem, {backgroundColor: isSelected ? "red" : "white" }]}>
        {isSelected && <Text>X</Text>}
      </View>
    </TouchableWithoutFeedback>
    )
  };

  const subtotalsPerEmployee = useMemo(() => {
    const subtotals = {};
    selectedItems.forEach(item => {
      const name = Object.keys(item)[0];
      const daysWorked = item[name].length;
      const employeeData = employees.find(e => e.name === name);
      if (employeeData) {
        subtotals[name] = daysWorked * employeeData.salary;
      }
    });
    return subtotals;
  }, [selectedItems, employees]);

  const totalSalary = useMemo(() => {
    return Object.values(subtotalsPerEmployee).reduce((acc, current) => acc + current, 0);
  }, [subtotalsPerEmployee]);

  const SubTotalRender = ({salary, days}) => {
    const subTotal = (salary || 0) * (days || 0);
  
    return (
      <View style={styles.subTotal}>
        <Text style={{fontWeight: "bold"}}>${subTotal}</Text>
      </View>
    );
  }

  const customGrid = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderItem title="Employee" />
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, index) => (
          <HeaderItem key={index} title={day} />
        ))}
        <HeaderItem title="SubTotal" />
      </View>
      {employees.map((employee, index) => (
        <View key={index} style={styles.row}>
          <GridItem
            onPress={() => handleItemClick(employee.name)}
            text={employee.name}
          />
          {employee.schedule.map((day, dayIndex) => (
            <GridItemEmpty
              key={dayIndex}
              onPress={() => handleItemClick({[employee.name]: [day]})}
              item={{[employee.name]: [day]}}
            />
          ))}
          <SubTotalRender salary={employee.salary} days={daysWorkedPerEmployee[employee.name] || 0}/>
          
        </View>
        
      ))}
      <View style={styles.totalSalary}>
        <Text style={{fontSize: 18, fontWeight: "bold", marginRight: 4}}>Total:</Text>
        <Text style={{marginRight: 12, fontSize: 18, fontWeight: "bold"}}>${totalSalary}</Text>
      </View>
      
    </ScrollView>
    
  );

  return (
    <SafeAreaView style={styles.container}>
      {customGrid()}
      {/* {dateModal()} */}

    </SafeAreaView>
  );
}

const modalContainerMarginTop = 22;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  salaryContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textTitle: {
    fontSize: 24,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: 180,
    fontSize: 28,
    borderRadius: 6,
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
   
  },
  headerItem: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  gridItem: {
    width:81,
    padding: 10,
    
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center"
  },
  subTotal: {
    padding: 10,
    justifyContent: "center"
  },
  totalSalary: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 2,
    justifyContent: "flex-end"
  }
});
