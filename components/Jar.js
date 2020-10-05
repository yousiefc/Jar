/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import Scraps from './Scraps'
import colorChange from '../utils/colorChange'
import AsyncStorage from '@react-native-community/async-storage'
 

//TODO: allow to clear and delete scraps and jars

const Jar = (props) => {
	const [currentInput, setCurrentInput] = useState('')
	const [scraps, setScraps] = useState(props.route.params.jar.scraps)

	const lightColor = colorChange(props.route.params.jar.color,.25)
  

	//Add the scrap to storage
	const addItem = () => {
		if(currentInput !== ''){
			var newScrap = {
				text: currentInput,
				key: Date.now()
			}    
			const tmpScraps = [...scraps, newScrap]
			const store = async () => {
        
				try{
					await AsyncStorage.mergeItem(props.route.params.jar.name, JSON.stringify({scraps: tmpScraps}))
				}catch(e) {
					alert(e)
				}
			}
			store()
		} 
		//Ma'am why wont you re-render?
		setCurrentInput('')
	} 
  
	//poll storage for scraps and update state with result
	useEffect(() => {
		const getScraps = async () => {
			try{
				let storedJar = await AsyncStorage.getItem(props.route.params.jar.name)
				let parsed = JSON.parse(storedJar)
				setScraps(parsed.scraps)
			}catch(e){ 
				alert(e)
			}
		}
  
		getScraps()
	})

	const selectScrap = () => {
		if(scraps.length !== 0) {
			var randomScrap = scraps[Math.floor(Math.random() * scraps.length)]
			console.log(randomScrap.text)
      
			return (
				<View>
					<Text>
              The choice is:
					</Text>
					<Text>{randomScrap.text}</Text>
				</View>
			)
		}
	}

	return (
		<SafeAreaView style={styles.container}>

			<View style={styles.headerStacked}>
				<Text style={styles.title}> {props.route.params.jar.name} </Text>
				<Button 
					mode="contained" 
					onPress={() => selectScrap()} 
					style={styles.random} 
					color={props.route.params.jar.color} >
             Select A Scrap
				</Button>
			</View>

			<View style={styles.header}>
				<TextInput 
					mode="outlined" 
					placeholder="Write a scrap for this jar!" 
					onChangeText={a => setCurrentInput(a)} 
					value={currentInput} 
					style={styles.input}
				/>
				<Button 
					mode="contained" 
					compact={true} 
					onPress={addItem} 
					style={styles.add} 
					color={props.route.params.jar.color} >
            +
				</Button>
			</View>

			<View style={{marginBottom: 330}}>
				<Scraps entries={scraps} color={lightColor} extraData={currentInput} /> 
			</View>

		</SafeAreaView>                                                                       
	)
}

const styles = StyleSheet.create({
	container: {
		//alignItems: 'center',
		//justifyContent: 'center',
		paddingTop: 50,
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
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		//justifyContent: 'center',
		marginVertical: 10
	},
	headerStacked: {
		alignItems: 'center',
		justifyContent: 'center',
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
	random: {
		marginVertical: 10,
		textAlign: 'center',
		justifyContent: 'center',
		height: 34,
		//width: 150,
		//borderRadius: 5,
		//backgroundColor: '#66ccff'
	},
	title: {
		marginTop: 10,
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},

})

export default Jar
