// import React, {Component} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import FingerprintScanner from 'react-native-fingerprint-scanner';

// export default class BiometricPopup extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       biometryType: null,
//       errorMessage: null,
//     };
//   }

//   componentDidMount() {
//     FingerprintScanner.isSensorAvailable()
//       .then(biometryType => {
//         this.setState({biometryType});
//       })
//       .catch(error => {
//         this.setState({errorMessage: error.message});
//         console.log('isSensorAvailable error => ', error);
//       });
//   }

//   getMessage = () => {
//     const {biometryType} = this.state;
//     if (biometryType === 'Face ID') {
//       return 'Scan your Face on the device to continue';
//     } else {
//       return 'Scan your Fingerprint on the device scanner to continue';
//     }
//   };

//   requestFingerprintPermission = () => {
//     if (Platform.OS === 'android') {
//       FingerprintScanner.authenticate({description: this.getMessage()})
//         .then(() => {
//           console.log('Authentication successful');
//           // Your logic on successful authentication
//         })
//         .catch(error => {
//           console.log('Authentication error:', error);
//         });
//     } else {
//       console.log('iOS does not require explicit permission request');
//     }
//   };

//   render() {
//     const {biometryType, errorMessage} = this.state;

//     return (
//       <SafeAreaView style={styles.container}>
//         {errorMessage && (
//           <Text style={styles.errorText}>{`Error: ${errorMessage}`}</Text>
//         )}
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           onPress={this.requestFingerprintPermission}
//           disabled={!biometryType}>
//           <Text style={styles.buttonText}>Authenticate</Text>
//         </TouchableOpacity>
//         <Text style={styles.biometryText}>{`Biometry Type: ${
//           biometryType || 'Checking...'
//         }`}</Text>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonStyle: {
//     width: '70%',
//     backgroundColor: '#000',
//     borderRadius: 25,
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   biometryText: {
//     color: '#000',
//     fontSize: 17,
//     fontWeight: 'bold',
//     marginTop: 30,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 15,
//     marginTop: 10,
//   },
// });

import React, {useEffect, useState} from 'react';
import {Biometrics} from 'react-native-biometrics';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
const handleBiometric = () => {
  useEffect(() => {
    handleBiometric();
  });
  const [isAuth, setIsAuth] = useState(false);

  TouchID.isSupported(optionalConfigObject).then(biometryType => {
    if (biometryType === 'FaceID') {
      console.log('FaceID is supported.');
    } else {
      console.log('TouchID is supported.');
      TouchID.authenticate('', optionalConfigObject)
        .then(success => {
          console.log('Success', success);
        })
        .catch(err => {
          console / log('Error', err);
        });
    }
  });
};

export default handleBiometric;
