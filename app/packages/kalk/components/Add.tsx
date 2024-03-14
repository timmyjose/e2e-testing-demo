import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { KALK_ADD_SERVER } from '../constants'
import axios from 'axios'

const ADD_SERVER_URL = `http://localhost:${KALK_ADD_SERVER}/exec`

type AddRequest = {
  x: number;
  y: number;
}

type AddResponse = {
  sum: number;
}

export default function Add() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [sum, setSum] = useState<string>('')

  const handleAdd = async () => {
    try {
      const resp = await axios.post<AddResponse>(ADD_SERVER_URL, {
        x,
        y
      } as AddRequest)

      setSum(resp.data.sum.toString())
    } catch (err) {
      console.error(err)
      setSum('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable testID='add-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <TextInput
        testID='add-textinput-x'
        style={styles.textinput}
        keyboardType='numeric'
        placeholder='Enter the first number'
        value={x.toString()}
        onChangeText={text => {
          const sanitisedText = text.replace(/[^0-9.]/g, '')
          setX(parseFloat(sanitisedText))
        }}
      />
      <TextInput
        testID='add-textinput-y'
        style={styles.textinput}
        keyboardType='numeric'
        placeholder='Enter the second number'
        value={y.toString()}
        onChangeText={text => {
          const sanitisedText = text.replace(/[^0-9.]/g, '')
          setY(parseFloat(sanitisedText))
        }}
      />
      <Pressable testID='add-add-button' style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Text testID='add-sum-text' style={{ fontSize: 20, fontWeight: 'bold' }}>{sum}</Text>
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
