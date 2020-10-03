/* eslint-disable react/prop-types */
import React, {} from 'react'
import { Text, StyleSheet, FlatList } from 'react-native'

const Scraps = (props) => {
	return(
		<FlatList 
			data={props.entries}
			extraData={props.extraData}
			renderItem={ ({item}) =>
				<Text 
					style={{...styles.scrap, backgroundColor: props.color}} 
					key={item.key}> {item.text} 
				</Text>
			}
		/>
	)
}

const styles = StyleSheet.create({
	scrap: {
		//backgroundColor: '#ddd',
		height: 35,
		fontSize: 16,
		paddingLeft: 5,
		padding: 5,
		borderRadius: 2,
		marginTop: 10,
	},
})

export default Scraps