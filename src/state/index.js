import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import styles from '../../css/style';

const Counter = () => {
  const [number, setNumber] = useState(0);
  return (
    <View>
      <Text style={{marginTop: 20, fontWeight: 'bold'}}>{number}</Text>
      <Button title="Tambah Gambar" onPress={() => setNumber(number + 1)} />
    </View>
  );
};

const StateDinamis = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Materi State Dinamis</Text>
      <Counter />
    </View>
  );
};

export default StateDinamis;
