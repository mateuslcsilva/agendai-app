import { StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { createTables, selectFirst } from '@/database/database';

export default function Dashboard() {
	const post = useLocalSearchParams();
	const [userId, setUserId] = useState<number | null>(null);

	useEffect(() => {
		const getUser = async() => {
			const userId = SecureStore.getItem('userId');
			if(userId) setUserId(Number(userId))
			console.log('userId', userId)
		}
		getUser();
	}, [])

	if(!userId){
		return <Redirect href="/modal" />;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			<EditScreenInfo path="app/(tabs)/index.tsx" />
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
