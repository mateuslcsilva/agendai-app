import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';

export default function Dashboard() {
	const post = useLocalSearchParams();
	const [userId, setUserId] = useState<number | null>(null);

	if(!userId){
		if(post?.userId){
			setUserId(Number(post.userId));
			router.setParams({});
		}
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
