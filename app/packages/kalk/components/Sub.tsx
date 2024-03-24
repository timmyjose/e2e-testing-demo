import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const DATA_LOADER_URL = 'http://127.0.0.1:8888/gen'
const SUB_SERVER_URL = 'http://127.0.0.1:9001/exec'

type SubRequest = {
  x: number;
  y: number;
}

type SubResponse = {
  diff: number;
}

type FetchDataLoaderRequest = {
  low: number | null;
  high: number | null;
}

type FetchDataLoaderResponse = {
  x: number;
  y: number;
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

  const handleDataLoaderFetch = async () => {
    try {
      const resp = await axios.post<FetchDataLoaderResponse>(DATA_LOADER_URL, {
        low: null,
        high: null
      } as FetchDataLoaderRequest)

      setX(resp.data.x)
      setY(resp.data.y)
    } catch (err) {
      console.error(err)
      setX(0)
      setY(0)
    }
  }

  return (
    <SafeAreaView testID='sub-screen' style={styles.container}>
      <Pressable testID='sub-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <Pressable testID='sub-data-loader-fetch-button' style={styles.button} onPress={handleDataLoaderFetch}>
        <Text style={styles.buttonText}>Fetch Data</Text>
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
