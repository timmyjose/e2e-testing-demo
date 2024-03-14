import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Add')}>
        <Text style={styles.buttonText}>Add Demo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Sub')}>
        <Text style={styles.buttonText}>Sub Demo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Mul')}>
        <Text style={styles.buttonText}>Mul Demo</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Div')}>
        <Text style={styles.buttonText}>Div Demo</Text>
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
