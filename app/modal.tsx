import { StatusBar } from 'expo-status-bar';
import { Keyboard, Platform, StyleSheet, TextInput, ToastAndroid, TouchableNativeFeedback } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';

const validEmailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export default function ModalScreen() {
	const [signIn, setSignIn] = useState(false);
	const [signInName, setSignInName] = useState('');
	const [signInEmail, setSignInEmail] = useState('');
	const [signInPhone, setSignInPhone] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
	const [signInPasswordConfirm, setSignInPasswordConfirm] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	
	useEffect(() => {
		setSignInPhone(signInPhone => phoneMask(signInPhone))
    }, [signInPhone])

	const login = async() => {
		Keyboard.dismiss();
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email: loginEmail, password: loginPassword})
		};

		await fetch(`https://lcsilva.cloud/authUser`, requestOptions)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				ToastAndroid.show(
					res.message,
					ToastAndroid.LONG
				);
				if(res.status != 200) return false;
				router.replace({
					pathname: '/',
					params: {
						userId: res.userId
					}
				});
			})
			.catch(error => {
				console.log(error)
			});
	}

	const saveUser = async() => {
		if(signInPassword != signInPasswordConfirm) return alert('As duas senhas não conferem. Por favor, regite e tente novamente.');
		const data = {
			name: signInName, 
			email: signInEmail,
			phone: signInPhone,
			password: signInPassword
		}

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		console.log('data do formulário', data)

		await fetch(`https://lcsilva.cloud/saveUser`, requestOptions)
			.then(res => res.json())
			.then(res => {
				router.replace({
					pathname: '/',
					params: {
						userId: res.userId
					}
				});
			})
			.catch(error => {
				console.log(error)
			});
	}

	function phoneMask(v : string) {
		var r = v.replace(/\D/g, "");
		r = r.replace(/^0/, "");
		if (r.length > 10) {
			r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
		} else if (r.length > 5) {
			r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
		} else if (r.length > 2) {
			r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
		} else if(r.length >= 1) {
			r = r.replace(/^(\d*)/, "($1");
		}
		return r;
	}

	return (
		<View style={styles.container}>
			{!signIn && (
				<>
					<View style={styles.textContainer}>
						<Text style={styles.title}>Bem vindo ao <Text style={styles.appName}>Agendai!</Text></Text>
						<Text style={styles.subtitle}>Insira seu email e senha</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Email:</Text>
						<TextInput value={loginEmail} onChangeText={setLoginEmail} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Senha:</Text>
						<TextInput value={loginPassword} onChangeText={setLoginPassword} secureTextEntry={true} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<TouchableNativeFeedback onPress={login}>
						<Text style={styles.button}>
							Logar
						</Text>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => setSignIn(true)}>
						<Text style={styles.bottomText}>Ainda não tenho conta</Text>
					</TouchableNativeFeedback>
				</>)}
			{signIn && (
				<>
					<View style={styles.textContainer}>
						<Text style={styles.title}>Bem vindo ao <Text style={styles.appName}>Agendai!</Text></Text>
						<Text style={styles.subtitle}>Preencha as informações abaixo para se cadastrar.</Text>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Nome:</Text>
						<TextInput value={signInName} onChangeText={setSignInName} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Email:</Text>
						{/*@ts-ignore */}
						<TextInput value={signInEmail} onChangeText={setSignInEmail} inputMode="email" keyboardType='email-address' cursorColor={Colors.primaryFontColor.color} style={[styles.input, (signInEmail && !validEmailRegex.test(signInEmail)) && {borderColor: 'red'}]}></TextInput>
						{(signInEmail && !validEmailRegex.test(signInEmail)) && <Text style={styles.invalidInput}>*Email inválido</Text>}
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Telefone:</Text>
						<TextInput keyboardType='phone-pad' value={signInPhone} onChangeText={setSignInPhone} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Senha:</Text>
						<TextInput value={signInPassword} onChangeText={setSignInPassword} secureTextEntry={true} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputLabel}>Repetir senha:</Text>
						<TextInput value={signInPasswordConfirm} onChangeText={setSignInPasswordConfirm} secureTextEntry={true} cursorColor={Colors.primaryFontColor.color} style={styles.input}></TextInput>
					</View>
					<TouchableNativeFeedback onPress={saveUser}>
						<Text style={styles.button}>
							Pronto!
						</Text>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback onPress={() => setSignIn(false)}>
						<Text style={styles.bottomText}>Já tenho uma conta</Text>
					</TouchableNativeFeedback>
				</>)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.lightThemeBackground.backgroundColor
	},
	textContainer: {
		marginBottom: 20
	},
	title: {
		fontSize: 32,
		color: '#3c3c3c',
		fontWeight: 'bold'
	},
	appName: {
		color: Colors.primaryFontColor.color,
	},
	subtitle: {
		color: '#3c3c3c',
		fontSize: 16,
		textAlign: 'left',
	},
	inputContainer: {
		width: '70%',
		gap: 8,
		marginBottom: 16,
		position: 'relative'
	},
	inputLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#3c3c3c'
	},
	input: {
		borderWidth: 1,
		borderColor: '#3c3c3c80',
		borderRadius: 7,
		paddingVertical: 8,
		paddingHorizontal: 16,
		fontSize: 18
	},
	invalidInput: {
		color: 'red',
		textAlign: 'right',
		position: 'absolute',
		bottom: -18,
		right: 0
	},
	button: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 7,
		backgroundColor: Colors.primaryFontColor.color,
		fontSize: 24,
		marginTop: 12
	},
	bottomText: {
		color: '#3c3c3c',
		fontSize: 20,
		textAlign: 'left',
		marginTop: 32,
		textDecorationLine: 'underline'
	},
});
