import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { KALK_SUB_SERVER } from '../constants'
import axios from 'axios'

const SUB_SERVER_BASE = process.env.CI ? 'e2e-testing-demo-sub_server-1' : '0.0.0.0'
const SUB_SERVER_URL = `http://${SUB_SERVER_BASE}:${KALK_SUB_SERVER}/exec`

type SubRequest = {
  x: number;
  y: number;
}

type SubResponse = {
  diff: number;
}

export default function Sub() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [diff, setDiff] = useState<string>('')

  const handleSub = async () => {
    try {
      const resp = await axios.post<SubResponse>(SUB_SERVER_URL, {
        x,
        y
      } as SubRequest)

      setDiff(resp.data.diff.toString())
    } catch (err) {
      console.error(err)
      setDiff('')
    }
  }

  return (
    <SafeAreaView testID='sub-screen' style={styles.container}>
      <Pressable testID='sub-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <TextInput
        testID='sub-textinput-x'
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
        testID='sub-textinput-y'
        style={styles.textinput}
        keyboardType='numeric'
        placeholder='Enter the second number'
        value={y.toString()}
        onChangeText={text => {
          const sanitisedText = text.replace(/[^0-9.]/g, '')
          setY(parseFloat(sanitisedText))
        }}
      />
      <Pressable testID='sub-sub-button' style={styles.button} onPress={handleSub}>
        <Text style={styles.buttonText}>Sub</Text>
      </Pressable>
      <Text testID='sub-diff-text' style={{ fontSize: 20, fontWeight: 'bold' }}>{diff}</Text>
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
