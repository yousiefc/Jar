import { DefaultTheme } from 'react-native-paper'

const theme = {
	...DefaultTheme,
	roundness: 5,
	colors: {
		...DefaultTheme.colors,
		primary: '#3498db',
		accent: '#f1c40f',
		surface: '#f2f2f2',
		text: '#404040'
	},
}

export default theme