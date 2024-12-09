import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../../css/style';
import imagePattern from '../../assets/wave_register.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocation,
  faUser,
  faMailBulk,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
const colors = {
  primary: '#1F7378',
  white: '#ffffff',
};
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <View style={registerStyle.container}>
      {/* CONTENT */}
      <View stye={registerStyle.body}>
        <View style={{marginTop: 24}}>
          <View style={registerStyle.formContainer}>
            <Text style={{fontSize: 30, fontWeight: 800, color: 'black'}}>
              Create New Account
            </Text>
          </View>
        </View>

        <View style={{marginTop: 2}}>
          <View style={registerStyle.formContainer}>
            <FontAwesomeIcon style={registerStyle.iconUser} icon={faUser} />
            <TextInput
              style={registerStyle.formInput}
              placeholder="Your name"
              placeholderTextColor="black"
              fontSize={18}
              keyboardType="text"
            />

            <FontAwesomeIcon icon={faPhone} style={registerStyle.iconPhone} />
            <TextInput
              style={registerStyle.formInput}
              placeholder="Phone number"
              placeholderTextColor="black"
              fontSize={18}
              keyboardType="number-pad"
            />

            <FontAwesomeIcon
              icon={faEnvelope}
              style={registerStyle.iconEmail}
            />
            <TextInput
              style={registerStyle.formInput}
              placeholder="Email"
              placeholderTextColor="black"
              fontSize={18}
              keyboardType="email-address"
            />

            <FontAwesomeIcon icon={faLock} style={registerStyle.iconLock} />
            <TextInput
              style={registerStyle.formInput}
              placeholder="Password"
              placeholderTextColor="black"
              fontSize={18}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles.eyeIcon}>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={registerStyle.iconEye}
              />
            </TouchableOpacity>

            <FontAwesomeIcon icon={faLock} style={registerStyle.iconLock2} />
            <TextInput
              style={registerStyle.formInput}
              placeholder="Repeat Password"
              placeholderTextColor="black"
              fontSize={18}
              secureTextEntry={!showRepeatPassword}
            />

            <TouchableOpacity
              onPress={toggleShowRepeatPassword}
              style={styles.eyeIcon}>
              <FontAwesomeIcon
                icon={showRepeatPassword ? faEyeSlash : faEye}
                style={registerStyle.iconEye2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={registerStyle.formContainer}>
          <View style={{maxWidth: 250}}>
            <TouchableOpacity
              onPress={() => alert('Congratulation You are Registered!')}>
              <Text style={{color: 'black'}}>
                I here by agree with the Terms and Conditions tha apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            margin: 24,
            marginTop: 56,
            marginBottom: 36,
          }}>
          <TouchableOpacity
            onPress={() => alert('Congratulation You are Registered!')}
            style={registerStyle.buttonRegister}>
            <Text style={registerStyle.buttonTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={registerStyle.footer}>
          <Image source={imagePattern} />
        </View>
      </View>

      {/* END CONTENT */}
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const registerStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  footer: {
    backgroundColor: 'white',
    height: 120,
    justifyContent: 'flex-end',
    bottom: 0,
  },
  formInput: {
    width: width * 0.7, // 70% of the screen width
    height: height * 0.05, // 5% of the screen height
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingTop: height * 0.015, // 1.5% of the screen height
    padding: width * 0.005, // 0.5% of the screen width
    paddingLeft: width * 0.06, // 6% of the screen width
    color: 'black',
    marginBottom: height * 0.02, // 2% of the screen height
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.06, // 6% of the screen height
    backgroundColor: 'white',
  },

  buttonRegister: {
    width: width * 0.25, // 25% of the screen width
    height: height * 0.05, // 5% of the screen height
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.17,
    shadowRadius: height * 0.01, // 1% of the screen height
    elevation: 5,
  },

  buttonTextRegister: {
    color: colors.white,
    fontSize: width * 0.04, // 4% of the screen width
    fontWeight: 'bold',
  },

  iconUser: {
    position: 'absolute',
    top: height * 0.02, // 2% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconPhone: {
    position: 'absolute',
    top: height * 0.09, // 9% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconEmail: {
    position: 'absolute',
    top: height * 0.16, // 18% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconLock: {
    position: 'absolute',
    top: height * 0.23, // 24% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconLock2: {
    position: 'absolute',
    top: height * 0.3, // 32% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconEye: {
    position: 'absolute',
    top: height * 0.07, // 7% of the screen height
    right: width * 0.03, // 3% of the screen width
  },

  iconEye2: {
    position: 'absolute',
    top: height * 0.14, // 14% of the screen height
    right: width * 0.03, // 3% of the screen width
  },

  imagePattern: {
    bottom: 0, // Fix to bottom of the screen
    width: '100%',
    height: height * 0.2, // 20% of the screen height
  },
});

export default Register;
