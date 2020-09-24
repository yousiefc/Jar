import React, { useState } from 'react'
import {  View, StyleSheet } from 'react-native'
import { Provider as PaperProvider, Surface } from 'react-native-paper'
import theme from './utils/theme'
import Constants from 'expo-constants'
import Jar from './components/Jar'
//import defaultColors from './utils/defaultColors'

//TODO: for now everythign is volatile, use AsyncStorage to store all the scraps locally

const App = () => {

  //TODO: figure out how to export this properlyyyyyyyyyy
  const defaultColors = {
    blue: '#00ccff',
    red: '#ff5050',
    green: '#66ff66',
    orange: '#ff9933',
    yellow: 'ffdb4d',
    purple: '#cc99ff',
    gray: '#ccc'
  }

  const randomColor = () => {
    let keys = Object.keys(defaultColors)
    return defaultColors[keys[ keys.length * Math.random() << 0]]
  }
  const [color, setColor] = useState(randomColor())

  //TODO: create a jar display for the widgets on the home page, rather than change the color here, change it on these widgets

  return (
    <PaperProvider theme={theme}>
    <Surface style={styles.container}>
        <Jar color={color} />
    </Surface>
    </PaperProvider>
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
