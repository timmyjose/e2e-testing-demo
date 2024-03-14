import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'
import Add from './components/Add'
import Sub from './components/Sub'
import Mul from './components/Mul'
import Div from './components/Div'
import * as React from 'react'

export type RootParamsList = {
  Home: undefined;
  Add: undefined;
  Sub: undefined;
  Mul: undefined;
  Div: undefined;
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Add' component={Add} />
        <Stack.Screen name='Sub' component={Sub} />
        <Stack.Screen name='Mul' component={Mul} />
        <Stack.Screen name='Div' component={Div} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
