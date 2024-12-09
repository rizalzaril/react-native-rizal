import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from '../../css/style';

const CatagoryImages = props => {
  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Image
        source={{uri: props.gambar}}
        style={{width: 50, height: 50, borderRadius: 50}}
      />
      <Text style={{color: 'black'}}>{props.judul}</Text>
    </View>
  );
};

const PropsDinamis = () => {
  return (
    <View>
      <Text style={{marginLeft: 20}}>Catagories Props Dinamis </Text>
      <ScrollView horizontal>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <CatagoryImages
            judul="Art"
            gambar="https://i.pinimg.com/564x/71/19/57/711957a4bcf082d2d227d2a75e0e08e6.jpg"
          />
          <CatagoryImages
            judul="Photos"
            gambar="https://i.pinimg.com/564x/b6/76/ce/b676ceb52dd975fd53434229041265e9.jpg"
          />
          <CatagoryImages
            judul="Animation"
            gambar="https://i.pinimg.com/564x/1a/fc/a0/1afca0c02a451e9c7f32cf9d5ef955f1.jpg"
          />
          <CatagoryImages
            judul="Graffiti"
            gambar="https://i.pinimg.com/736x/bf/52/00/bf52000fdc3ea7c7e84d9eab7e65ac65.jpg"
          />
          <CatagoryImages
            judul="Photos"
            gambar="https://i.pinimg.com/564x/b6/76/ce/b676ceb52dd975fd53434229041265e9.jpg"
          />
          <CatagoryImages
            judul="Animation"
            gambar="https://i.pinimg.com/564x/1a/fc/a0/1afca0c02a451e9c7f32cf9d5ef955f1.jpg"
          />
          <CatagoryImages
            judul="Art"
            gambar="https://i.pinimg.com/564x/71/19/57/711957a4bcf082d2d227d2a75e0e08e6.jpg"
          />
          <CatagoryImages
            judul="Photos"
            gambar="https://i.pinimg.com/564x/b6/76/ce/b676ceb52dd975fd53434229041265e9.jpg"
          />
          <CatagoryImages
            judul="Animation"
            gambar="https://i.pinimg.com/564x/1a/fc/a0/1afca0c02a451e9c7f32cf9d5ef955f1.jpg"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PropsDinamis;
