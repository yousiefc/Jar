/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Text, View, StyleSheet, SafeAreaView, Dimensions, FlatList } from 'react-native'
import Scraps from './Scraps'
//import colorChange from '../utils/colorChange'
import AsyncStorage from '@react-native-community/async-storage'


const Jar = (props) => {
	const jar = props.route.params.jar
	const [currentInput, setCurrentInput] = useState('')
	const [scraps, setScraps] = useState(jar.scraps)

	//const lightColor = colorChange(props.route.params.jar.color,.2)

	/* SAVE SCRAP TO STORAGE */
	const addItem = async () => {
		if(currentInput !== ''){
			var newScrap = {
				text: currentInput,
				key: Date.now()
			}    
			const tmpScraps = [...scraps, newScrap]
        
			try{
				await AsyncStorage.mergeItem(jar.name, JSON.stringify({scraps: tmpScraps}))
			}catch(e) {
				alert(e)
			}
		} 
		//Ma'am why wont you re-render?
		setCurrentInput('')
	} 

	/* REMOVE SCRAP CORRESPONDING TO THE PASSED IN KEY FROM STORAGE */
	const removeItem = async (key) => {
		const tmpScraps = scraps.filter(scrap => scrap.key !== key)
		try{
			await AsyncStorage.mergeItem(jar.name, JSON.stringify({scraps: tmpScraps}))
		}catch(e) {
			alert(e)
		}
	}
  
	/* POLL STORAGE FOR SCRAPS AND UPDATE STATE (SCRAPS) WITH RESULT */
	useEffect(() => {

		let mounted = true
		const getScraps = async () => {
			try{
				let storedJar = await AsyncStorage.getItem(jar.name)
				let parsed = JSON.parse(storedJar)
				setScraps(parsed.scraps)
			}catch(e){ 
				alert(e)
			}
		}
  
		if (mounted) getScraps()
		return () => mounted = false
	})

	/* SELECT A RANDOM SCRAP */
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
				<Text style={styles.title}> {jar.name} </Text>
				<Button 
					mode="contained" 
					onPress={() => selectScrap()} 
					style={styles.random} 
					color={jar.color} >
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
					color={jar.color} >
            +
				</Button>
			</View>

			<View style={{marginBottom: 330}}>
				<FlatList 
					data={scraps}
					keyExtractor={item => item.key.toString()}
					renderItem={ ({item}) =>
						<View>
							<Text 
								style={{...styles.scrap, backgroundColor: jar.color}} 
								key={item.key}
							> 
								{item.text}
							</Text>
							<Button icon='close' 
								style={{position: 'absolute', alignSelf: 'flex-end', marginVertical: 10}} 
								color="#404040" 
								compact={true}
								onPress={ () => removeItem(item.key) } 
							/>
						</View>
					}
				/>
			</View>

		</SafeAreaView>                                                                       
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		flex: 1
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
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
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
		height: Dimensions.get('window').width/10,
		marginTop: 6,
		width: Dimensions.get('window').width/10,
		elevation: 4
	},
	random: {
		marginVertical: 10,
		textAlign: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').height/20,
	},
	title: {
		marginTop: 10,
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'center',
		justifyContent: 'center',
	},
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

export default Jar
