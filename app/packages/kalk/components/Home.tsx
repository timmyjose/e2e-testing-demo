import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  return (
    <SafeAreaView testID='home-screen' style={styles.container}>
      <Pressable testID='home-add-button' style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text testID='home-add-button-text' style={styles.buttonText}>Add Demo</Text>
      </Pressable>
      <Pressable testID='home-sub-button' style={styles.button} onPress={() => navigation.navigate('Sub')}>
        <Text testID='home-sub-button-text' style={styles.buttonText}>Sub Demo</Text>
      </Pressable>
      <Pressable testID='home-mul-button' style={styles.button} onPress={() => navigation.navigate('Mul')}>
        <Text testID='home-mul-button-text' style={styles.buttonText}>Mul Demo</Text>
      </Pressable>
      <Pressable testID='home-div-button' style={styles.button} onPress={() => navigation.navigate('Div')}>
        <Text testID='home-div-button-text' style={styles.buttonText}>Div Demo</Text>
      </Pressable>
      <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 12,
    marginBottom: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  textinput: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    padding: 10
  }
})
