/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Button, TextInput, Portal, Dialog, Card } from 'react-native-paper'
import { Text, View, StyleSheet, SafeAreaView, Dimensions, FlatList, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Jar = (props) => {
	const jar = props.route.params.jar
	const [random, setRandom] = useState('')
	const [visible, setVisible] = useState(false)
	const [currentInput, setCurrentInput] = useState('')
	const [scraps, setScraps] = useState(jar.scraps)

	//const lightColor = colorChange(props.route.params.jar.color,.2)

	/* SAVE SCRAP TO STORAGE */
	const addItem = async () => {
		if(currentInput !== ''){
			Keyboard.dismiss()

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
			console.log('SCRAP USE EFFECT')
		}
  
		if (mounted) getScraps()
		return () => mounted = false
	})

	/* SELECT A RANDOM SCRAP */
	const selectScrap = () => {
		if(scraps.length !== 0) {
			var randomScrap = scraps[Math.floor(Math.random() * scraps.length)]
			console.log(randomScrap)
			
			setRandom(randomScrap.text)
			showDialog()
		}
	}

	const showDialog = () => setVisible(true)
	const hideDialog = () => setVisible(false)

	return (
		<SafeAreaView style={styles.container} >

			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Your choice is:</Dialog.Title>
					<Dialog.Content>
						<Text style={{...styles.title, color:jar.color}}>{random}</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<View style={styles.headerStacked}>
				<Text style={styles.title}> {jar.name} </Text>
				<Button 
					mode="contained" 
					onPress={selectScrap} 
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

			<View style={{marginBottom: 180}}>
				<FlatList 
					data={scraps}
					keyExtractor={item => item.key.toString()}
					renderItem={ ({item}) =>
						<Card style={{...styles.scrap, backgroundColor: jar.color}}>
							<Text  
								key={item.key}
								style={{alignSelf: 'center'}}
							> 
								{item.text}
							</Text>
							<Button icon='close' 
								style={{position: 'absolute', alignSelf: 'flex-end', marginTop: -5}} 
								color="#404040" 
								compact={true}
								onPress={ () => removeItem(item.key) } 
							/>
						</Card>
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
		elevation: 2
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
		justifyContent: 'center',
		paddingVertical: 6,
		height: Dimensions.get('window').height/22,
		fontSize: 16,
		borderRadius: 3,
		marginTop: 10,
		marginHorizontal: 10,
		color: '#404040',
		elevation: 1
	},

})

export default Jar
