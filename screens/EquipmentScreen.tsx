import { StyleSheet, FlatList } from 'react-native';
import { Card, Button, Icon, SearchBar } from 'react-native-elements';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

let itemArray = [
   {
    name: "tractor",
    price: "$20.00/hour" ,
    desc: "Barely used, latest model",
    datePosted: "5 days ago",
    distance: "10 miles away",
    id: 1
  },
  {
    name: "digger",
    price: "$8.00/hour" ,
    desc: "Tested well on any soil",
    datePosted: "10 days ago",
    distance: "10 miles away",
    id: 2
  },
  {
    name: "backhoe",
    price: "$9.00/hour" ,
    desc: "We have a spare in case the one you gets breaks",
    datePosted: "20 days ago",
    distance: "20 miles away",
    id: 3
  },
  {
    name: "auger",
    price: "$8.00/hour" ,
    desc: "We provide a set of six",
    datePosted: "5 days ago",
    distance: "1-2 miles away",
    id: 4
  },  
];

const Grid = ({ items }: any) => {
  // let id = 0;
  itemArray.map((item) => {
    console.log(item.name);
  });
  return (
    <View style={styles.grid}>
      <FlatList
        data={itemArray}
        renderItem={({ item }) => (
          <Card containerStyle={styles.gridCard}>
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                  'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Card.Divider />
            <Card.Title>{item.name}</Card.Title>
          </Card>
          // <Text style={styles.gridCard} key={item.id}>
          //   {item.name}
          // </Text>
        )}
        numColumns={2}
      // keyExtractor={(item: object, index: number) => name}
      />
    </View>
  );
};

export default function EquipmentScreen({ navigation }: RootStackScreenProps<'Equipment'>) {
  const homeUpBtnHandler = () => {
    navigation.navigate("Home");
  }

  const jobsBtnHandler = () => {
    navigation.navigate('Jobs');
  }

  const equipBtnHandler = () => {
    navigation.navigate("Equipment");
  }

  const produceBtnHandler = () => {
    navigation.navigate('Produce');
  }

  return (
    <View style={styles.container}>
        <Text>Welcome to the Equipment Screen!</Text>
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
  grid:{
    flexDirection:"row"
  },
  gridCard:{
    flex: 3
  }
});