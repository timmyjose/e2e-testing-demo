import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text } from 'react-native'
import { RootParamsList } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const JSON_PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/todos/1'

type FetchResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// This component is available for use iff the ENV_NAME is `e2e`
export default function JsonPlaceHolder() {
  const [todo, setTodo] = useState<string>('')

  const handleJsonFetch = async () => {
    try {
      const resp = await axios.get(JSON_PLACEHOLDER_URL)
      const data: FetchResponse = resp.data
      setTodo(JSON.stringify(data, null, 2))
    } catch (err: any) {
      console.error(err)
      setTodo(err.toString())
    }
  }

  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  return (
    <SafeAreaView testID='json-placeholder-screen' style={styles.container}>
      <Pressable testID='json-placeholder-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <Pressable testID='json-placeholder-fetch-button' style={styles.button} onPress={handleJsonFetch}>
        <Text style={styles.buttonText}>Fetch</Text>
      </Pressable>
      <Text testID='json-placeholder-todo-text'>{todo}</Text>
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
  }
})
