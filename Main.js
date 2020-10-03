/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, TextInput, Appbar } from 'react-native-paper'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Main = ({navigation}) => {

	const [currentInput, setCurrentInput] = useState('')
	const [jars, setJars] = useState([])
    
	const defaultColors = {
		blue: '#00ccff',
		red: '#ff5050',
		green: '#66ff66',
		orange: '#ff9933',
		yellow: '#ffdb4d',
		purple: '#cc99ff',
		gray: '#ccc'
	}
    
    
	const randomColor = () => {
		let keys = Object.keys(defaultColors)
		return defaultColors[keys[ keys.length * Math.random() << 0]]
	}
	
    
	const addItem = async () => {
		if (currentInput !== '') {
			var newJar = {
				name: currentInput,
				color: randomColor(),
				scraps: [],
			}	 
			const jsonValue = JSON.stringify(newJar)
			await AsyncStorage.setItem(currentInput, jsonValue)   		 
		}
		setCurrentInput('')	 
	}
    
	useEffect(() => {
		const getJars = async () => {
			let keys = []
			keys = await AsyncStorage.getAllKeys()
			let values = await AsyncStorage.multiGet(keys)
			let out = []
			values.forEach(x => {
				out.push(JSON.parse(x[1]))
			})
			setJars(out)
		}
		getJars()
	}, [currentInput])

	return (
		<ScrollView style={styles.container} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} >
            
			<View style={{backgroundColor: '#f2f2f2', zIndex: 1000, paddingTop: 70}}>
				<Text style={styles.title}>Your Jars</Text>
				<View style={styles.header}>
					<TextInput 
						mode="outlined" 
						placeholder="Name a new jar!" 
						onChangeText={a => setCurrentInput(a)} 
						value={currentInput} 
						style={styles.input}
					/>
					<Button 
						mode="contained" 
						compact={true} 
						onPress={() => addItem()} 
						style={styles.add} 
						color='pink' >
            +
					</Button>
				</View>
			</View>

			<View style={styles.bottom}>
				{jars.map((jar, key) => {
					return (
						<Button 
							mode='contained'
							style={{...styles.widget, backgroundColor: jar.color  }}
							key={key}
							onPress={() => {navigation.navigate('Jar', {jar: jar}) }}
						>
							{jar.name}
						</Button>
					)
				})}
			</View>

		</ScrollView>
	)
}



const styles = StyleSheet.create({
	container: {
		//paddingTop: 70
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		//justifyContent: 'center',
		marginVertical: 10
	},
	input: {
		paddingLeft: 7,
		paddingRight: 7,
		marginRight: 6,
		height: 36,
		width: 346,
		//borderRadius: 5,
		borderColor: '#aaa',
		//borderWidth: 1,
	},
	add: {
		textAlign: 'center',
		justifyContent: 'center',
		height: 35,
		marginTop: 6,
		width: 36,
		//borderRadius: 5,
		//backgroundColor: '#66ccff',
	},
	title: {
		marginTop: 10,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},
	widget: {
		textAlign: 'center',
		justifyContent: 'center',
		height: 150,
		width: 375,
		marginHorizontal: 10,
		marginVertical: 10
	},
	bottom: {
		marginBottom: 100,
		zIndex: -999
	}
})

export default Main