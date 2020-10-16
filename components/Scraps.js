/* eslint-disable react/prop-types */
import React, {} from 'react'
import { Text, StyleSheet, FlatList, Dimensions, View } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

const Scraps = ({jar}) => {

	const removeItem = async (value) => {
		const tmpScraps = jar.scraps.filter(scrap => scrap !== value)
		try{
			await AsyncStorage.mergeItem(jar.name, JSON.stringify({scraps: tmpScraps}))
		}catch(e) {
			alert(e)
		}
	}

	return(
		<FlatList 
			data={jar.scraps}
			keyExtractor={item => item.key.toString()}
			renderItem={ ({item}) =>
				<View>
					<Text 
						style={{...styles.scrap, backgroundColor: jar.color}} 
						key={item.key}
					> 
						{item.text}
					</Text>
					<Button icon='close' style={{position: 'absolute', alignSelf: 'flex-end', marginVertical: 10}} color="#404040" compact={true}
						onPress={() => {removeItem(item.text)}} />
				</View>
			}
		/>
	)
}

const styles = StyleSheet.create({
	scrap: {
		textAlign: 'center',
		height: Dimensions.get('window').height/22,
		fontSize: 16,
		paddingVertical: 8,
		borderRadius: 3,
		marginTop: 10,
		color: '#404040'
	},
})

export default Scraps