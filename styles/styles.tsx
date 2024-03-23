import Colors from "@/constants/Colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    input: {
        borderRadius: 7,
        borderColor: Colors.primaryFontLightColor.color,
        borderWidth: 2,
        padding: 4,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryFontColor.color
    },
    button: { 
        paddingHorizontal: 20, 
        paddingVertical: 12, 
        borderRadius: 7,
        color: Colors.lightThemeBackground.backgroundColor,
        backgroundColor: Colors.primaryColorBackground.backgroundColor ,
        width: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    secondaryButton: { 
        paddingHorizontal: 20, 
        paddingVertical: 12, 
        borderRadius: 7,
        color: '#3c3c3c90',
        backgroundColor: Colors.primaryFontLightColor.color,
        width: 'auto',
        marginLeft: 'auto',
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        borderColor: Colors.primaryColorBackground.backgroundColor,
        borderWidth: 1
    },
    radioButton: {
        textAlign: 'center',
        backgroundColor: Colors.primaryFontLightColor.color,
        color: '#3c3c3c90',
        width: '50%',
        paddingVertical: 12,
        fontSize: 16
    },
    radioButtonLeft: {
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    radioButtonRight: {
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
})