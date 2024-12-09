import React from 'react';
import {View, Text, SectionList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SectionListBasic = () => {
  const navigation = useNavigation();

  const handlePress = item => {
    switch (item) {
      case 'Ganti Password':
        navigation.navigate('ChangePassword');
        break;
      case 'Ubah Profil':
        navigation.navigate('UpdateProfile');
        break;
      case 'Beralih Ke creator':
        navigation.navigate('SwitchToCreator');
        break;
      case 'Register':
        navigation.navigate('Register');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{marginTop: 24, padding: 24}}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
        Test List
      </Text>
      <SectionList
        sections={[
          {
            title: 'Akun',
            data: ['Ganti Password', 'Ubah Profil', 'Beralih Ke creator'],
          },
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
          {
            title: 'User',
            data: ['Register'],
          },
        ]}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Text style={{color: 'black', marginTop: 12}}>{item}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => (
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              backgroundColor: '#51c4f5',
              marginTop: 12,
            }}>
            {section.title}
          </Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default SectionListBasic;
