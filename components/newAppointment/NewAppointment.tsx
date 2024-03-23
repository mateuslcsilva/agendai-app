import { Text, StyleSheet, View, TextInput, TouchableNativeFeedback } from 'react-native'
import { styles as globalStyles } from '@/styles/styles';
import React, { Component, useState } from 'react';import { FontAwesome6 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export const NewAppointment = (props : any) => {
    return (
      <View style={{ display: 'flex', gap: 20 }}>
        <Text style={ [globalStyles.title, { color: '#3c3c3c' }] }>Novo campo</Text>
        <View style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <Text style={{ fontSize: 16 }}>
                Pergunta
            </Text>
            <TextInput 
				cursorColor={Colors.primaryFontLightColor.color}
                style={globalStyles.input} 
				value={props.question}
				onChangeText={props.setQuestion} 
            />
        </View>
		<View style={{ display: 'flex', gap: 20 }}>
			<Text style={{ fontSize: 16 }}>Tipo de resposta</Text>
			<View style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
				<TouchableNativeFeedback onPress={() => props.setFieldType('short')}>
					<Text style={[ globalStyles.radioButton, globalStyles.radioButtonLeft, props.fieldType == 'short' && styles.radioButtonSelected ]}>Curta</Text>
				</TouchableNativeFeedback>
				<TouchableNativeFeedback onPress={() => props.setFieldType('long')}>
					<Text style={[ globalStyles.radioButton, globalStyles.radioButtonRight, props.fieldType == 'long' && styles.radioButtonSelected ]}>Longa</Text>
				</TouchableNativeFeedback>
			</View>
		</View>
        <TouchableNativeFeedback onPress={props.saveField}>
			<Text 
				style={globalStyles.secondaryButton}>
					<FontAwesome6 name="check" size={24} color="#3c3c3cab" />
			</Text>
        </TouchableNativeFeedback>
      </View>
    )
}

const styles = StyleSheet.create({
	radioButtonSelected: {
		backgroundColor: Colors.primaryColorBackground.backgroundColor,
		color: Colors.lightThemeBackground.backgroundColor,
		fontWeight: 'bold'
	}
})