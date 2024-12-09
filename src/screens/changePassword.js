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
import imagePattern from '../../assets/wave_reset_password.png';
const ChangePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <View style={resetPasswordStyle.container}>
      <View style={resetPasswordStyle.body}>
        <View style={{marginTop: 0}}>
          <Text style={{color: 'black', fontSize: 30, fontWeight: 800}}>
            Reset Password
          </Text>
          <View style={{marginTop: 36}}>
            <FontAwesomeIcon
              icon={faLock}
              style={resetPasswordStyle.iconLock}
            />
            <TextInput
              style={resetPasswordStyle.formInput}
              placeholder="New Password"
              placeholderTextColor="black"
              fontSize={18}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={toggleShowNewPassword}>
              <FontAwesomeIcon
                icon={showNewPassword ? faEyeSlash : faEye}
                style={resetPasswordStyle.iconEye}
              />
            </TouchableOpacity>

            <FontAwesomeIcon
              icon={faLock}
              style={resetPasswordStyle.iconLock2}
            />
            <TextInput
              style={resetPasswordStyle.formInput}
              placeholder="New Password"
              placeholderTextColor="black"
              fontSize={18}
              secureTextEntry={!showConfirmNewPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmNewPassword}>
              <FontAwesomeIcon
                icon={showConfirmNewPassword ? faEyeSlash : faEye}
                style={resetPasswordStyle.iconEye}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <TouchableOpacity style={resetPasswordStyle.buttonSubmit}>
              <Text style={resetPasswordStyle.buttonTextSubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={resetPasswordStyle.footer}>
        <Image source={imagePattern} style={{position: 'absolute', right: 0}} />
      </View>
    </View>
  );
};

const colors = {
  primary: '#1F7378',
  white: '#ffffff',
};
const {width, height} = Dimensions.get('window');

const resetPasswordStyle = StyleSheet.create({
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
    height: 300,
    justifyContent: 'flex-end',
  },

  formInput: {
    width: width * 0.7, // 70% of the screen width
    height: height * 0.05, // 5% of the screen height
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingTop: height * 0.015, // 1.5% of the screen height
    padding: width * 0.005, // 0.5% of the screen width
    paddingLeft: width * 0.08, // 8% of the screen width
    color: 'black',
    marginBottom: height * 0.02, // 2% of the screen height
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.06, // 6% of the screen height
  },

  buttonSubmit: {
    width: width * 0.25, // 25% of the screen width
    height: height * 0.05, // 5% of the screen height
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: height * 0.01, // 1% of the screen height
    },
    shadowOpacity: 0.12,
    shadowRadius: height * 0.01, // 1% of the screen height
    elevation: 20,
  },

  buttonTextSubmit: {
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
    top: height * 0.18, // 18% of the screen height
    left: width * 0.15, // 15% of the screen width
  },

  iconLock: {
    position: 'absolute',
    top: height * 0.02, // 2% of the screen height
    left: width * 0.02, // 2% of the screen width
  },

  iconLock2: {
    position: 'absolute',
    bottom: height * 0.04, // 4% of the screen height
    left: width * 0.02, // 2% of the screen width
  },

  iconEye: {
    position: 'absolute',
    bottom: height * 0.03, // 3% of the screen height
    right: width * 0.03, // 3% of the screen width
    color: 'grey',
  },

  iconEye2: {
    position: 'absolute',
    top: height * 0.15, // 15% of the screen height
    right: width * 0.03, // 3% of the screen width
  },

  imagePattern: {
    position: 'absolute',
    bottom: 0, // Fix to bottom of the screen
    width: '100%',
    height: height * 0.2, // 20% of the screen height
  },
});

export default ChangePassword;
