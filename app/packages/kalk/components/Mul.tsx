import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { KALK_MUL_SERVER } from '../constants'
import axios from 'axios'

const MUL_SERVER_URL = `http://localhost:${KALK_MUL_SERVER}/exec`

type MulRequest = {
  x: number;
  y: number;
}

type MulResponse = {
  prod: number;
}

export default function Mul() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [prod, setProd] = useState<string>('')

  const handleMul = async () => {
    try {
      const resp = await axios.post<MulResponse>(MUL_SERVER_URL, {
        x,
        y
      } as MulRequest)

      setProd(resp.data.prod.toString())
    } catch (err) {
      console.error(err)
      setProd('')
    }
  }

  return (
    <SafeAreaView testID='mul-screen' style={styles.container}>
      <Pressable testID='mul-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <TextInput
        testID='mul-textinput-x'
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
        testID='mul-textinput-y'
        style={styles.textinput}
        keyboardType='numeric'
        placeholder='Enter the second number'
        value={y.toString()}
        onChangeText={text => {
          const sanitisedText = text.replace(/[^0-9.]/g, '')
          setY(parseFloat(sanitisedText))
        }}
      />
      <Pressable testID='mul-mul-button' style={styles.button} onPress={handleMul}>
        <Text style={styles.buttonText}>Mul</Text>
      </Pressable>
      <Text testID='mul-prod-text' style={{ fontSize: 20, fontWeight: 'bold' }}>{prod}</Text>
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
