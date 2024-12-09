import React, {useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faStore,
  faWarning,
  faLock,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const {width, height} = Dimensions.get('window');

export default function AddProducts() {
  const headers = [
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faStore} />
          <Text style={{marginLeft: 8, color: 'black'}}>Edit Toko</Text>
        </View>
      ),
      content: (
        // EDIT TOKO
        <View style={styles.editTokoContainer}>
          <View>
            <Image
              style={{height: height * 0.25, width: width * 0.66}}
              source={{
                uri: 'https://asumsi.co/wp-content/uploads/1644398291857_starbucksge35acbd7b1920.jpg',
              }}
            />
          </View>
          <Text
            style={{color: 'black', fontWeight: 'bold', marginVertical: 10}}>
            Address
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.textContainer}>
              <Text style={styles.textItem}>Province</Text>
              <Text style={styles.textItem}>City</Text>
              <Text style={styles.textItem}>District</Text>
              <Text style={styles.textItem}>Subdistrict</Text>
              <Text style={styles.textItem}>Postal Code</Text>
            </View>
            <View style={[styles.textContainer]}>
              <Text style={styles.textItemdata}>Dki Jakarta</Text>
              <Text style={styles.textItemdata}>Jakarta Selatan</Text>
              <Text style={styles.textItemdata}>Kemang</Text>
              <Text style={styles.textItemdata}>Bangka</Text>
              <Text style={styles.textItemdata}>12345</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faWarning} />
          <Text style={{marginLeft: 8, color: 'black'}}>Term & Conditions</Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Terms and conditions content goes here.
          </Text>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faLock} />
          <Text style={{marginLeft: 8, color: 'black'}}>Privacy & Policy</Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Privacy and policy content goes here.
          </Text>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faUserGear} />
          <Text style={{marginLeft: 8, color: 'black'}}>For Customer</Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>For customer content goes here.</Text>
        </View>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nik, setNik] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [alamat, setAlamat] = useState('');

  // const [id, setId] = useState('');

  // const deleteData = async id_user => {
  //   try {
  //     await axios.delete(`http://10.0.2.2:3000/users/${id_user}`);
  //     setData(data.filter(payloadItem => payloadItem.id_user !== id_user));
  //     Alert.alert('Success', 'Data deleted successfully!');
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to delete data.');
  //   }
  // };

  const deleteData = async id_user => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:3000/users/${id_user}`,
      );
      console.log('Delete response:', response);
      if (response.status === 200) {
        setData(data.filter(payloadItem => payloadItem.id_user !== id_user));
        Alert.alert('Success', 'Data deleted successfully!');
      } else {
        Alert.alert('Error', 'Failed to delete data. Please try again.');
      }
    } catch (error) {
      console.error('Error during delete request:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      Alert.alert('Error', 'Failed to delete data.');
    }
  };

  const simpanData = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/users/', {
        nik: nik,
        username: username,
        password: password,
        name_user: nameUser,
        alamat: alamat,
      });
      console.log(response.data);
      Alert.alert('Berhasil disimpan');
      fetchData(); // Refetch data after saving
    } catch (error) {
      Alert.alert('Gagal disimpan');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FETCH DATA DARI REAL API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://10.0.2.2:3000/users/');
      console.log('Full Response:', JSON.stringify(response, null, 1));
      console.log('Response Data:', JSON.stringify(response.data, null, 1));

      if (Array.isArray(response.data)) {
        setData(response.data);

        response.data.forEach(user => {
          if (Array.isArray(user.payload)) {
            user.payload.forEach(payloadItem => {
              console.log(
                'Username:',
                JSON.stringify({username: payloadItem.username}, null, 1),
                JSON.stringify({Alamat: payloadItem.alamat}, null, 1),
              );
            });
          } else {
            console.log(
              'Expected user.payload to be an array but got:',
              typeof user.payload,
            );
          }
        });
      } else {
        console.log('Expected an array but got:', typeof response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {headers.map((item, i) => (
        <Item key={i} header={item.header} content={item.content} />
      ))}
      <View style={{paddingTop: 12, paddingBottom: 12}}>
        <Text>Nik:</Text>
        <TextInput
          style={styles.inputData}
          value={nik}
          onChangeText={setNik}
          placeholder="Enter your nik"
        />
        <Text>Username:</Text>
        <TextInput
          style={styles.inputData}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
        <Text>Name User:</Text>
        <TextInput
          style={styles.inputData}
          value={nameUser}
          onChangeText={setNameUser}
          placeholder="Enter your username"
        />
        <Text>password:</Text>
        <TextInput
          style={styles.inputData}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your username"
        />
        <Text>Alamat:</Text>
        <TextInput
          style={styles.inputData}
          value={alamat}
          onChangeText={setAlamat}
          placeholder="Enter your username"
        />
        <Button title="Submit" onPress={simpanData} />
      </View>

      <Text style={{fontSize: 20, textAlign: 'center', paddingTop: 24}}>
        fetching Data From Local API Node.js dan Mysql
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        data.map((user, userIndex) => (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 24,
              paddingTop: 24,
            }}
            key={userIndex}>
            {Array.isArray(user.payload) ? (
              user.payload.map((payloadItem, payloadIndex) => (
                <View key={payloadIndex}>
                  <View
                    style={{
                      width: 100,
                      padding: 12,
                      height: 'auto',
                      backgroundColor: 'yellow',
                      elevation: 10,
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <Text>{payloadItem.name_user}</Text>
                    <Text>{payloadItem.username}</Text>
                    <Text>{payloadItem.alamat}</Text>
                    <Text>{payloadItem.password}</Text>
                    <Text>{payloadItem.id_user}</Text>
                    <Button
                      title="Delete"
                      onPress={() => deleteData(payloadItem.id_user)}
                    />
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text>{typeof user.payload}</Text>
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

function Item({header, content}) {
  const [open, setOpen] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
        <View style={styles.row}>
          {header}
          <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} />
        </View>
        {open && <View>{content}</View>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  item: {
    width: '100%',
    borderWidth: 0,
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editTokoContainer: {
    margin: 20,
    backgroundColor: '#DBE3EA',
    width: width * 0.75,
    height: 'auto',
    borderRadius: 10,
    padding: 15,
  },
  contentContainer: {
    margin: 20,
    backgroundColor: '#DBE3EA',
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  textContainer: {
    justifyContent: 'space-between',
  },
  textItem: {
    marginVertical: 5,
    color: 'black',
    textAlign: 'left',
  },
  textItemdata: {
    marginVertical: 5,
    color: 'black',
    textAlign: 'right',
  },
  inputData: {
    width: '100%',
    height: 50,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    borderColor: 'green',
    marginTop: 12,
    marginBottom: 24,
  },
});
