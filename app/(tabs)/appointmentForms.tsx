import { ScrollView, StyleSheet, TouchableNativeFeedback } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { styles as globalStyles } from '@/styles/styles';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Link, Redirect, router, useLocalSearchParams } from 'expo-router';

interface AppointmentForm{
	id: number,
	created_at: string,
	form_name: string,
	numberOfQuestions: number
}

export default function TabTwoScreen() {
	const post = useLocalSearchParams();
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

	if(post?.update == 'true'){
		return <Redirect href="/appointmentForms" />;
	}

	return (
		<ScrollView style={{ flex: 1, backgroundColor: Colors.lightThemeBackground.backgroundColor }}>
			<View style={styles.container}>
				{forms.length > 0 && forms.map(form => (
					<Link href={{
						pathname: "/modalAppointmentForm",
						params: { formData: JSON.stringify(form) }
					}} 
					asChild 
					key={form.id}
					style={styles.form}
					>
						<TouchableNativeFeedback>
							<View style={styles.formContainer}>
								<Text style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text style={styles.title}>{form.id} - {form.form_name}</Text>
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
