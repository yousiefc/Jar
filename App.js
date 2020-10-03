/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {  StyleSheet } from 'react-native'
import { Provider as PaperProvider, Surface } from 'react-native-paper'
import theme from './utils/theme'
import Constants from 'expo-constants'
import Jar from './components/Jar'
import Main from './Main'
import { NavigationContainer } from '@react-navigation/native' //TODO: stack navigator for all the components!!!
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

const App = () => {

	//TODO: create a jar display for the widgets on the home page, rather than change the color here, change it on these widgets

	return (
		<NavigationContainer>
			<PaperProvider theme={theme}>
				<Surface style={styles.container}>
					<Stack.Navigator initialRouteName='Main'>
						<Stack.Screen name="Main" component={Main} />
						<Stack.Screen name="Jar" component={Jar} />
					</Stack.Navigator>
				</Surface>
			</PaperProvider>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		paddingTop: Constants.statusBarHeight,
		//backgroundColor: '#ecf0f1',
		padding: 8,
	},
	card: {
		minHeight: 300
	}
})

export default App
