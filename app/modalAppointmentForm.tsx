import { useEffect, useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, TouchableNativeFeedback, ToastAndroid, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { styles as globalStyles } from '@/styles/styles';
import { NewAppointment } from '@/components/newAppointment/NewAppointment';
import { router, useLocalSearchParams } from 'expo-router';

interface initialState {
	id: undefined | number
	question: string,
	type: 'short' | 'long'
};

interface action {
	type: string,
	field: string,
	value: string | boolean
}

export default function ModalScreen() {
	const post = useLocalSearchParams();
	const [formId, setFormId] = useState<number | null>(null);
	const [formName, setFormName] = useState('');
	const [question, setQuestion] = useState('');
	const [fieldType, setFieldType] = useState<'short' | 'long'>('short');
	const [questions, setQuestions] = useState([] as Array<initialState>);

	useEffect(() => {
		if (post?.formData && !formId) {
			//@ts-ignore
			const form = JSON.parse(post?.formData);
			console.log('form no post', form);
			setFormName(form.form_name);
			setFormId(form.id);
			const getInfo = async () => {
				await getItemsAppointmentForms(form.id);
			}
			getInfo();
		}
	}, [post])

	/* 	useEffect(() => {
			console.log(questions);
		}, [questions]) */

	const addInputField = () => {
		setQuestions([...questions, { question: question, type: fieldType, id: undefined }]);
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
		console.log('data do formulário', data)

		await fetch(`https://lcsilva.cloud/saveAppointmentForm`, requestOptions)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				ToastAndroid.show(
					'Formulário salvo com sucesso!!',
					ToastAndroid.LONG
				);
				resetStates();
				router.push({
					pathname: '/appointmentForms',
					params: {
						update: 'true'
					}
				});
			})
			.catch(error => {
				console.log(error)
			});
	}

	const getItemsAppointmentForms = async (formId = null) => {
		await fetch(`https://lcsilva.cloud/getItemsAppointmentForms/${formId}`)
			.then(res => res.json())
			.then((res) => {
				console.log('getItemsAppointmentForms', res);
				setQuestions(res);
			})
			.catch(error => console.log(error))
	}

	const deleteItemsAppointment = async (itemId: number | string) => {
		if (typeof itemId == "string") {
			setQuestions(questions.filter(question => question.question != itemId))
		}
		console.log('itemId', itemId)
		await fetch(`https://lcsilva.cloud/deleteItemAppointmentForm/${itemId}`, { method: 'DELETE' })
			.then(res => res.json())
			.then((res) => {
				ToastAndroid.show(
					res.message,
					ToastAndroid.LONG
				);
				setQuestions(questions.filter(question => question.id != itemId));
			})
			.catch(error => console.log(error))
	}

	const confirmDeleteForm = () => {
		Alert.alert('Deletar formulário', 'Tem certeza que deseja deletar o formulário?', [
			{
			  text: 'Cancel',
			  onPress: () => null,
			  style: 'cancel',
			},
			{text: 'OK', onPress: () => deleteForm()},
		  ]);
	  
	}

	const deleteForm = async () => {
		console.log(formId);
		await fetch(`https://lcsilva.cloud/deleteAppointmentForm/${formId}`, { method: 'DELETE' })
		.then(res => res.json())
		.then((res) => {
			ToastAndroid.show(
				res.message,
				ToastAndroid.LONG
			);
			resetStates();
			router.push({
				pathname: '/appointmentForms',
				params: {
					update: 'true'
				}
			});
		})
		.catch(error => console.log(error))
	}

	const resetStates = () => {
		setFormName('');
		setFieldType('short');
		setQuestion('');
		setQuestions([] as Array<initialState>);
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: Colors.lightThemeBackground.backgroundColor }}>
			<View style={styles.container}>
				<Text style={{ color: Colors.primaryFontColor.color, fontSize: 16 }}>As perguntar sobre usuário são automáticamente incluídas nos formulários</Text>

				<View style={{ display: 'flex', gap: 12, marginTop: 12 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={[globalStyles.title, { color: '#3c3c3c' }]}>Nome do formulário</Text>
						<TouchableNativeFeedback style={{ marginLeft: 'auto' }} onPress={confirmDeleteForm}>
							<Ionicons name="trash-outline" size={24} color="#EE4B2B" />
						</TouchableNativeFeedback>
					</View>
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
							<View style={{ flexDirection: 'row', gap: 12 }}>
								<Text style={{ color: '#3c3c3c', fontSize: 16 }}>{item.type == 'short' ? 'Resposta curta' : 'Resposta longa'}</Text>
								<TouchableNativeFeedback onPress={() => deleteItemsAppointment(item.id || item.question)}>
									<Ionicons name="trash-outline" size={20} color="#EE4B2B" />
								</TouchableNativeFeedback>
							</View>
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
