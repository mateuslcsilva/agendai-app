import { StyleSheet, TouchableNativeFeedback } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import  { styles as globalStyles }  from '@/styles/styles'

export default function TabTwoScreen() {

  const saveForm = async () => {
		//ToastAndroid.show('Formulário salvo com sucesso!!', ToastAndroid.LONG);
		/* router.push('/appointments'); */
		const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dados: 'dados'})
        };
		await fetch(`http://127.0.0.1:3000/getAppointments`)
		.then(res => res.json())
		.then(res => {
			console.log(res)
			/* router.push('/'); */
		})
		.catch(error => {
			console.log(error)
		});
	}

  return (
    <View style={styles.container}>
				<TouchableNativeFeedback onPress={saveForm}>
					<Text
						style={[ globalStyles.button, { marginLeft: 0 } ]}>
						Salvar formulário!
					</Text>
				</TouchableNativeFeedback>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
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
});
