import { ScrollView, StyleSheet, TouchableNativeFeedback } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { styles as globalStyles } from '@/styles/styles';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';

//const mockupData = [{ "id": 1, "created_at": "2024-03-23T03:00:00.000Z", "form_name": 'form name', "numberOfQuestions": 0 }, { "id": 2, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 3, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 4, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 5, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 6, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 7, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 8, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 9, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 10, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 1 }, { "id": 11, "created_at": null, "form_name": "teste nome form", "numberOfQuestions": 1 }, { "id": 12, "created_at": "2024-03-23T16:33:03.000Z", "form_name": "teste nome form", "numberOfQuestions": 0 }, { "id": 13, "created_at": "2024-03-23T16:33:57.000Z", "form_name": "teste nome form", "numberOfQuestions": 3 }];

interface AppointmentForm{
	id: number,
	created_at: string,
	form_name: string,
	numberOfQuestions: number
}

export default function TabTwoScreen() {
	const [forms, setForms] = useState<Array<AppointmentForm>>([] as Array<AppointmentForm>);

	useEffect(() => {
		const getInfo = async() => {
			await getAppointmentForms();
		}
		getInfo();
	}, [])

	const getAppointmentForms = async() => {
	
		await fetch(`https://lcsilva.cloud/getAppointmentForms`) 
		.then(res => res.json())
		.then(async (res) => {
			console.log(res);
			setForms(res);
		})
		.catch(error => console.log(error))
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: Colors.lightThemeBackground.backgroundColor }}>
			<View style={styles.container}>
				{forms.length > 0 && forms.map(form => (
					<Link href={{
						pathname: "/modalAppointmentForm",
						params: { formData: JSON.stringify(form) }
					}} 
					asChild key={form.id}
					style={styles.form}
					>
						<TouchableNativeFeedback>
							<View style={styles.formContainer}>
								<Text style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text style={styles.title}>{form.form_name}</Text>
									<Entypo name="chevron-small-right" size={24} color="black" />
								</Text>
								<Text style={{color: '#3c3c3c', marginTop: 'auto', marginLeft: 'auto'}}>
									Perguntas: 
									<Text style={{color: '#3c3c3c'}}>
										{form.numberOfQuestions}
									</Text>
								</Text>
							</View>
						</TouchableNativeFeedback>
					</Link>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
	formContainer: {
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 2,
		height: 120,
		width: '100%',
		padding: 20
	},
	form: {

	}
});
