/* eslint-disable no-unused-vars */
import React from 'react'
import {  StyleSheet } from 'react-native'
import { Provider as PaperProvider, Surface } from 'react-native-paper'
import theme from './utils/theme'
import Constants from 'expo-constants'
import Jar from './components/Jar'
import Main from './Main'
import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack'
import { registerRootComponent } from 'expo'


const Stack = createStackNavigator()

const App = () => {

	return (
		<NavigationContainer>
			<PaperProvider theme={theme}>
				<Surface style={styles.container}>
					<Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
						<Stack.Screen name="Main" component={Main}  />
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
		padding: 8,
	},
	card: {
		minHeight: 300
	}
})
registerRootComponent(App)
export default App
