const path = require('path')

const loadEnv = (envFile) => {
  require('dotenv').config({ path: envFile })
}

loadEnv(path.resolve(__dirname, '.env.test'))

/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? 'debug' : undefined,
  },
  testRunner: {
    $0: 'jest',
    args: {
      config: 'e2e/jest.config.js',
      _: ['e2e']
    }
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: 'failing'
    }
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build:
        'xcodebuild -workspace ios/kalk.xcworkspace -scheme kalk -configuration Debug -sdk iphonesimulator -arch arm64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/kalk.app'
    },
    'ios.release': {
      type: 'ios.app',
      build:
        'xcodebuild -workspace ios/kalk.xcworkspace -scheme kalk -configuration Release -sdk iphonesimulator -arch arm64 -derivedDataPath ios/build',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/kalk.app'
    },
    'android.debug': {
      type: 'android.apk',
      build:
        'cd android && ./gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug && cd ..',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk'
    },
    'android.release': {
      type: 'android.apk',
      build:
        'cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'pixel_4',
      }
    },
  },
  configurations: {
    'ios.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'ios.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'android.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.release': {
      device: 'emulator',
      app: 'android.release'
    }
  }
}
