import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import Add from './components/Add'
import Sub from './components/Sub'
import Mul from './components/Mul'
import Div from './components/Div'
import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { LogBox } from 'react-native'
import { ENV_NAME } from './constants'
import JsonPlaceHolder from './components/JsonPlaceHolder'

console.log('ENV_NAME = ', ENV_NAME)
if (ENV_NAME === 'e2e') {
  console.log('Running in e2e environment. Ignoring all warning/error logs')
  LogBox.ignoreAllLogs()
}

// intro sliders
const slides = [
  {
    key: 'five',
    title: '5',
    image: require('./assets/intro-sliders/5.jpg')
  },
  {
    key: 'four',
    title: '4',
    image: require('./assets/intro-sliders/4.jpg')
  },
  {
    key: 'three',
    title: '3',
    image: require('./assets/intro-sliders/3.jpg')
  },
  {
    key: 'two',
    title: '2',
    image: require('./assets/intro-sliders/2.jpg')
  },
  {
    key: 'one',
    title: '1',
    image: require('./assets/intro-sliders/1.jpg')
  }
]

export type RootParamsList = {
  Home: undefined;
  Add: undefined;
  Sub: undefined;
  Mul: undefined;
  Div: undefined;
  JsonPlaceHolder: undefined;
}

const Stack = createNativeStackNavigator()

export default function App() {
  const [showApp, setShowApp] = React.useState<boolean>(false)

  const renderSlide = ({ item }: any) => {
    return (
      <View style={styles.slide}>
        <Text>{item.title}</Text>
        <Image style={styles.slideImage} source={item.image} />
        <Text>{item.text}</Text>
      </View>
    )
  }

  const onDone = async () => {
    setShowApp(true)
  }

  return (
    showApp
      ? <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Add' component={Add} />
          <Stack.Screen name='Sub' component={Sub} />
          <Stack.Screen name='Mul' component={Mul} />
          <Stack.Screen name='Div' component={Div} />
          <Stack.Screen name='JsonPlaceHolder' component={JsonPlaceHolder} />
        </Stack.Navigator>
      </NavigationContainer>
      : <AppIntroSlider testID='app-intro-slider' renderItem={renderSlide} data={slides} onDone={onDone} />
  )
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'black'
  },
  slideImage: {
    height: '100%'
  }
})
