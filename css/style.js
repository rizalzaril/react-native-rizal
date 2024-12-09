import React from 'react';
import {StyleSheet} from 'react-native';
const colors = {
  primary: '#1F7378',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  marginLeft1: {
    marginLeft: 12,
  },
  marginTop1: {
    marginTop: 12,
  },

  marginBottom1: {
    marginBottom: 12,
  },

  box: {
    width: 300,
    height: 300,
  },

  bgDark: {
    backgroundColor: 'black',
  },

  formInput: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  btnRed: {
    backgroundColor: 'red',
  },

  btn: {
    width: 100,
    height: 50,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Optional: add space between items
    marginBottom: 12, // Optional: add space between rows
  },

  gap12: {
    gap: 12,
  },

  flexCenter: {
    justifyContent: 'center',
    alignItems: 'flex-center',
  },

  borderRadius1: {
    borderRadius: 10,
  },

  image: {
    display: 'flex',
    height: 300,
    width: 170,
    borderRadius: 10,
    objectFit: 'cover',
  },

  //   wrapper: {
  //     padding: 20,
  //   },

  //   textTitle: {
  //     textAlign: 'center',
  //   },
  mt1: {
    marginTop: 12,
  },
  mt2: {
    marginTop: 24,
  },
  mt3: {
    marginTop: 36,
  },
  mt4: {
    marginTop: 48,
  },
  mt5: {
    marginTop: 52,
  },

  containerBg: {
    flex: 1,
  },
  containerContent: {
    marginLeft: 36,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay warna hitam dengan opasitas 50%
  },

  // textHeader: {
  //   marginBottom: 400,
  // },

  textHeader1Content: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textHeader2Content: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'light',
    letterSpacing: 0.5,
  },

  loginForm: {
    height: '40',
    width: '80%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: 24,
    paddingLeft: 40,
    padding: 2,
    color: 'white',
  },
  emailIcon: {
    width: 21,
    height: 17,
    marginRight: 10,
    position: 'absolute',
    marginTop: 30,
    left: 42,
  },
  lockedIcon: {
    width: 19,
    height: 24,
    marginRight: 10,
    position: 'absolute',
    marginTop: 82,
    left: 42,
  },
  eyeIcon: {
    width: 19,
    height: 24,
    margin: 10,
    position: 'absolute',
    marginTop: 82,
    right: 35,
  },

  buttonLogin: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8, // Menambahkan border radius
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 5,
  },
  buttonTextLogin: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  iconEye: {
    color: colors.white,
    top: 5,
  },
});

export default styles;
