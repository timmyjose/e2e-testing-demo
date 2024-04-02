import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native'
import RNQRGenerator from 'rn-qr-generator'
import { RootParamsList } from '../App'

const URLS = [
  'https://reddit.com',
  'https://www.youtube.com',
  'https://www.facebook.com',
  'https://www.yamllint.com',
  'https://www.paste.rs/web'
]

function pickRandomUrl(): string {
  return URLS[Math.floor(Math.random() * URLS.length)]
}

export default function QRCode() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>()

  const [imageUri, setImageUri] = React.useState<number>(null)

  const generateQRCode = async () => {
    const url = pickRandomUrl()
    console.log('url = ', url)

    try {
      const { uri } = await RNQRGenerator.generate({
        value: url,
        height: 100,
        width: 100,
        correctionLevel: 'H'
      })
      console.log('uri = ', uri)
      setImageUri({ uri: uri })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable testID='qrcode-go-back-button' style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
      <Image style={styles.qrcode} source={imageUri} />
      <Pressable testID='qrcode-generate-button' style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </Pressable>
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
  },
  qrcode: {
    backgroundColor: '#F3F3F3',
    width: 100,
    height: 100,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16
  }
})
