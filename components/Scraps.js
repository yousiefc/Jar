/* eslint-disable react/prop-types */
import React, {} from 'react'
import { Text, StyleSheet, FlatList, Dimensions, View } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

const Scraps = (props) => {

	const removeItem = async () => {
		//TODO: these scraps need to be passed the full prop from the jar OR i just need to move this whole shebang to the Jar.js which tbh might save some headache
	}

	return(
		<FlatList 
			data={props.entries}
			keyExtractor={item => item.key.toString()}
			renderItem={ ({item}) =>
				<View>
					<Text 
						style={{...styles.scrap, backgroundColor: props.color}} 
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