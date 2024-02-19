import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import { Foundation } from '@expo/vector-icons';


const EmployeeHeader = ({photo, name, tel}) => {
    return (
        <View style={styles.employeeInfoContainer}>
            <View>
                <Pressable>
                    <Image
                        source={photo}
                        resizeMode='contain'
                        style={styles.avatar}
                    />
                </Pressable>
            </View>
            <View style={{
                marginLeft: 16
            }}>
                <Text style={styles.employeeName}>{name}</Text>
                <Text style={styles.employeePosition}>Dentist</Text>
                <View style={styles.telContainer}>
                    <Foundation name="telephone" size={24} color="black" />
                    <Text style={[styles.employeePosition, { marginHorizontal: 4 }]}>{tel}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    employeeInfoContainer: {
        flexDirection: "row",
        marginVertical: 6,
        alignItems: "center"
    },
    avatar: {
        height: 94,
        width: 94,
        borderRadius: 999
    },
    verified: {
        position: "absolute",
        top: 50,
        right: -6,
        zIndex: 999
    },
    employeeName: {
        fontSize: 18,
        color: "black"
    },
    employeePosition: {
        fontSize: 16,
        color: "gray"
    },
    telContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },
})

export default EmployeeHeader;