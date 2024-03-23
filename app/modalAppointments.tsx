import { useEffect, useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TouchableNativeFeedback, ToastAndroid } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { styles as globalStyles } from '@/styles/styles';
import { NewAppointment } from '@/components/newAppointment/NewAppointment';
import { router } from 'expo-router';

interface initialState {
	question: string,
	type: 'short' | 'long'
};

interface action {
	type: string,
	field: string,
	value: string | boolean
}

const INITIAL_STATE = {

} as initialState;

const reducer = (state: initialState, action: action) => {
	switch (action.type) {
		case "updateFieldValue":
			return { ...state, [action.field]: action.value };

		default:
			return INITIAL_STATE;
	}
};

export default function ModalScreen() {
	const [question, setQuestion] = useState<string>('');
	const [fieldType, setFieldType] = useState<'short' | 'long'>('short');
	const [appointments, setAppointments] = useState([] as initialState[]);

	useEffect(() => {
		console.log(question, fieldType);
	}, [question, fieldType])

	useEffect(() => {
		console.log(appointments);
	}, [appointments])

	/* 	const updateFieldValue = (field : string) => (event : any) => {
			dispatch({ type: "updateFieldValue", field, value: event.target.value });
		}; */

	const addInputField = () => {
		setAppointments([...appointments, { question: question, type: fieldType }]);
		setQuestion("");
		setFieldType('short');
	}

	const saveform = async () => {
		ToastAndroid.show('Formulário salvo com sucesso!!', ToastAndroid.LONG);
		router.push('/appointments');
		return;
		const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointments)
        };
        try {
            await fetch(`https://url/saveAppointment`, requestOptions)
                .then(res => res.json())
                .then(async res => {
					router.push('/')
                })
                .catch(erro => {
                });

        } catch (e) {
			console.log(e)
        }
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: Colors.lightThemeBackground.backgroundColor }}>
			<View style={styles.container}>
				<Text style={{ color: Colors.primaryFontColor.color, fontSize: 16 }}>As perguntar sobre usuário são automáticamente incluídas nos formulários</Text>
				<View style={{ marginTop: 20 }}>
					{appointments.map((item, index) => (
						<View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
								<Text style={styles.title}>{++index}.</Text>
								<Text style={{ color: '#3c3c3c', fontSize: 16 }}>{item.question}</Text>
							</View>
							<Text style={{ color: '#3c3c3c', fontSize: 16 }}>{item.type == 'short' ? 'Resposta curta' : 'Resposta longa'}</Text>
						</View>
					))}
				</View>
				<View style={styles.questionsContainer}>
					<NewAppointment question={question} setQuestion={setQuestion} fieldType={fieldType} setFieldType={setFieldType} saveField={() => addInputField()} />
				</View>
				<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
				<TouchableNativeFeedback onPress={saveform}>
					<Text
						style={[ globalStyles.button, { marginLeft: 0 } ]}>
						Salvar formulário!
					</Text>
				</TouchableNativeFeedback>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	questionsContainer: {
		paddingVertical: 20
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.primaryFontColor.color
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
