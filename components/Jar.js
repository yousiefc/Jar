/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Scraps from './Scraps'
import colorChange from '../utils/colorChange'
 

//TODO: allow to clear and delete scraps and jars

const Jar = (props) => {

	const [currentInput, setCurrentInput] = useState('')
	const [scraps, setScraps] = useState([])

	const lightColor = colorChange(props.color,.25)
  

	const addItem = (e) => {
		if(currentInput !== ''){
			console.log(currentInput)
			var newScrap = {
				text: currentInput,
				key: Date.now()
			}

			setScraps(scraps.concat(newScrap))
			setCurrentInput('')
		}
		//e.preventDefault();
		console.log(scraps)
	}

	const selectScrap = () => {
		if(scraps.length !== 0) {
			var randomScrap = scraps[Math.floor(Math.random() * scraps.length)]
			console.log(randomScrap)
      
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
		<ScrollView style={styles.container}>

			<View style={styles.headerStacked}>
				<Text style={styles.title}> Jar Name </Text>
				<Button 
					mode="contained" 
					onPress={() => selectScrap()} 
					style={styles.random} 
					color={props.color} >
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
					color={props.color} >
            +
				</Button>
			</View>

			<Scraps entries={scraps} color={lightColor}/>

		</ScrollView>                                                                       
	)
}

const styles = StyleSheet.create({
	container: {
		//alignItems: 'center',
		//justifyContent: 'center',
		paddingTop: 20,
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
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},

})

export default Jar
