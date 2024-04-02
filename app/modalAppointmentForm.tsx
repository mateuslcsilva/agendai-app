import { useEffect, useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TouchableNativeFeedback, ToastAndroid, TextInput } from 'react-native';

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
	const [formId, setFormId] = useState<number | null>(null);
	const [formName, setFormName] = useState('');
	const [question, setQuestion] = useState('');
	const [fieldType, setFieldType] = useState<'short' | 'long'>('short');
	const [questions, setQuestions] = useState([] as initialState[]);

	/* 	useEffect(() => {
			console.log(question, fieldType);
		}, [question, fieldType]) */

	useEffect(() => {
		console.log(questions);
	}, [questions])

	/* 	const updateFieldValue = (field : string) => (event : any) => {
			dispatch({ type: "updateFieldValue", field, value: event.target.value });
		}; */

	const addInputField = () => {
		setQuestions([...questions, { question: question, type: fieldType }]);
		setQuestion("");
		setFieldType('short');
	}

	const saveForm = async () => {
		const data = {
			form_name: formName,
			questions: questions
		}
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		console.log(data)
		return;
		await fetch(`http://127.0.0.1:3000/getAppointments`, requestOptions)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				ToastAndroid.show(
					'Formulário salvo com sucesso!!', 
					ToastAndroid.LONG
				);
				router.push('/appointmentForms');
			})
			.catch(error => {
				console.log(error)
			});
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: Colors.lightThemeBackground.backgroundColor }}>
			<View style={styles.container}>
				<Text style={{ color: Colors.primaryFontColor.color, fontSize: 16 }}>As perguntar sobre usuário são automáticamente incluídas nos formulários</Text>

				<View style={{ display: 'flex', gap: 12, marginTop: 12 }}>
					<Text style={ [globalStyles.title, { color: '#3c3c3c' }] }>
						Nome do formulário
					</Text>
					<TextInput
						cursorColor={Colors.primaryFontLightColor.color}
						style={globalStyles.input}
						value={formName}
						onChangeText={setFormName}
					/>
				</View>
				<View style={{ marginTop: 20 }}>
					{questions.map((item, index) => (
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
				<TouchableNativeFeedback onPress={saveForm}>
					<Text
						style={[globalStyles.button, { marginLeft: 0 }]}>
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
