import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from '../../css/style';
import image from '../../assets/auth/bg_auth.png';
import emailIcon from '../../assets/icon/email.png';
import lockedIcon from '../../assets/icon/locked.png';

const WelcomeAuth = ({navigation}) => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const actionLogin = () => {
    const url = 'https://reqres.in/api/login';
    const payload = {
      email: email,
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data dari server:', data); // Tambahkan ini untuk debug
        if (data.token) {
          Alert.alert(
            'Login Berhasil',
            `Selamat datang ${data.email}! Token: ${data.token}`,
          );
          fetchUserData(data.email); // Panggil email dari data respons
        } else {
          Alert.alert('Login Gagal', 'Email atau Password anda salah!');
        }
      })
      .catch(error => {
        console.log('Error:', error);
        Alert.alert('Login Error', 'Ada kesalahan pada script!');
      });
  };

  const fetchUserData = token => {
    const userUrl = 'https://reqres.in/api/users/2'; // Example endpoint to fetch user data
    fetch(userUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          navigation.navigate('NavigationBottom', {
            userName: data.data.first_name,
          }); // Pass userName to the HomeScreen
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={[styles.containerBg]}>
      <ImageBackground source={image} resizeMode="cover" style={[styles.image]}>
        <View style={styles.overlay} />

        {/* CONTENT */}

        {/* TEXT HEADER */}

        <View style={{marginBottom: 20}}>
          <View style={styles.containerContent}>
            <Text style={styles.textHeader1Content}>Hi, Welcome</Text>
            <Text style={styles.textHeader2Content}>
              Save money, free delivery
            </Text>

            {/* END TEXT HEADER */}
          </View>

          {/* FORM LOGIN */}
          <View style={{marginTop: 24, alignItems: 'center'}}>
            <Image source={emailIcon} style={styles.emailIcon} />
            <TextInput
              style={styles.loginForm}
              placeholder="Email"
              placeholderTextColor="white"
              fontSize={18}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Image source={lockedIcon} style={styles.lockedIcon} />
            <TextInput
              style={styles.loginForm}
              placeholder="Password"
              placeholderTextColor="white"
              fontSize={18}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles.eyeIcon}>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={styles.iconEye}
              />
            </TouchableOpacity>
          </View>
          {/* END FORM LOGIN */}
          <View style={{marginTop: 100}}>
            <View style={styles.containerContent}>
              <TouchableOpacity
                style={styles.textHeader2Content}
                onPress={() => handleGoTo('ChangePassword')}>
                <Text style={{fontSize: 16, color: 'white'}}>
                  Forget Password ?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textHeader2Content}
                onPress={() => alert('Register now !')}>
                <Text style={{fontSize: 16, color: 'white'}}>
                  Don't have an account ?
                </Text>
              </TouchableOpacity>
              <Text style={styles.textHeader2Content}></Text>
              {/* END TEXT HEADER */}
            </View>
          </View>

          <View style={{marginTop: 0}}>
            <View style={styles.containerContent}>
              <TouchableOpacity
                style={styles.textHeader2Content}
                onPress={() => handleGoTo('Register')}>
                <Text style={{fontSize: 16, color: '#D3B970'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 24}}>
            <View style={styles.containerContent}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  right: 30,
                }}>
                <TouchableOpacity
                  style={styles.buttonLogin}
                  onPress={actionLogin}>
                  <Text style={styles.buttonTextLogin}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* END CONTENT */}
      </ImageBackground>
    </View>
  );
};

export default WelcomeAuth;
