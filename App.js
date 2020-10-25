/* eslint-disable no-unused-vars */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider as PaperProvider, Surface } from 'react-native-paper'
import theme from './utils/theme'
import Constants from 'expo-constants'
import Jar from './components/Jar'
import Main from './Main'
import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack'
import { registerRootComponent } from 'expo'
import {QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

const Stack = createStackNavigator()

const App = () => {

	return (
		<ReactQueryCacheProvider queryCache={queryCache}>
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<Surface style={styles.container}>
						<Stack.Navigator initialRouteName='Main' screenOptions={{headerStyle: {backgroundColor: '#f2f2f2'}}}>
							<Stack.Screen name="Main" component={Main} options={{headerShown: false}}  />
							<Stack.Screen name="Jar" component={Jar} options={{title: ''}} />
						</Stack.Navigator>
					</Surface>
				</NavigationContainer>
			</PaperProvider>
		</ReactQueryCacheProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		paddingTop: Constants.statusBarHeight,
		
	},
	card: {
		minHeight: 300
	}
})
registerRootComponent(App)
export default App
