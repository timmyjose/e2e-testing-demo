import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { KALK_DIV_SERVER } from '../constants'
import axios from 'axios'

const DIV_SERVER_URL = `http://localhost:${KALK_DIV_SERVER}/exec`

type DivRequest = {
  x: number;
  y: number;
}

type DivResponse = {
  quot: number;
}

export default function Div() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [quot, setQuot] = useState<string>('')

  const handleDiv = async () => {
    try {
      const resp = await axios.post<DivResponse>(DIV_SERVER_URL, {
        x,
        y
      } as DivRequest)

      setQuot(resp.data.quot.toString())
    } catch (err) {
      console.error(err)
      setQuot('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable testID='div-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <TextInput
        testID='div-textinput-x'
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
        testID='div-textinput-y'
        style={styles.textinput}
        keyboardType='numeric'
        placeholder='Enter the second number'
        value={y.toString()}
        onChangeText={text => {
          const sanitisedText = text.replace(/[^0-9.]/g, '')
          setY(parseFloat(sanitisedText))
        }}
      />
      <Pressable testID='div-div-button' style={styles.button} onPress={handleDiv}>
        <Text style={styles.buttonText}>Div</Text>
      </Pressable>
      <Text testID='div-quot-text' style={{ fontSize: 20, fontWeight: 'bold' }}>{quot}</Text>
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
