/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Button, TextInput, Card} from 'react-native-paper'
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Main = ({navigation}) => {

	const [currentInput, setCurrentInput] = useState('')
	const [jars, setJars] = useState([])
    
	const defaultColors = {
		pink: '#ff61ab',
		blue: '#61ffb5',
		red: '#ff6176',
		green: '#abff61',
		orange: '#ff8161',
		yellow: '#ffea62',
		yorange: '#ffb561',
		purple: '#dd99ff',
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
    
	const removeItem = async (key) => {
		await AsyncStorage.removeItem(key)
	}
    
	useEffect(() => {

		let mounted = true
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
		if(mounted) getJars()
		return () => mounted = false
	})

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
						color='#ccc' >
            +
					</Button>
				</View>
			</View>

			<View style={styles.bottom}>
				{jars.map((jar, key) => {
					return (
						<Card 
							mode='contained'
							style={{...styles.widget, backgroundColor: jar ? jar.color : ''  }}
							key={key}
							onPress={() => {navigation.navigate('Jar', {jar: jar}) }}
						>
							<Button icon='close' 
								color='#404040' 
								style={{alignSelf: 'flex-end', marginRight: -15}}
								onPress={() => {removeItem(jar ? jar.name : null)}}
							>

							</Button>
							<Text style={{alignSelf: 'center', marginVertical: 30, fontWeight: 'bold', fontSize: 18, color: '#404040'}}>{jar ? jar.name : ''}</Text>
						</Card>
					)
				})}
			</View>

		</ScrollView>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10
	},
	input: {
		paddingLeft: 7,
		paddingRight: 7,
		height: 38,
		width: Dimensions.get('window').width/1.22,
		maxWidth: 500,
		borderColor: '#aaa',
		marginRight: 7,
		marginLeft: -7
    
	},
	add: {
		textAlign: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').width/10,
		marginTop: 6,
		width: Dimensions.get('window').width/10,
		elevation: 4
	},
	title: {
		marginTop: 10,
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},
	widget: {
		textAlign: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		height: Dimensions.get('window').width/2.7,
		maxHeight: 200,
		width: Dimensions.get('window').width -30,
		maxWidth: 400,
		elevation: 4,
		marginVertical: 10
	},
	bottom: {
		marginBottom: 100,
		zIndex: -999
	}
})

export default Main