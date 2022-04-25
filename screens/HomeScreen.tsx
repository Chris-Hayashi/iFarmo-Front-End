import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ProduceScreen({ navigation }: RootStackScreenProps<'Produce'>) {

  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [equipments, setEquipments] = useState([]);


  const getProductsByUser = async () => {

  }

  const getJobsByUser = async () => {

  }

  const getEquipmentsByUser = async () => {

  }

  return (
    <View style={styles.container}>
        <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
