import { StyleSheet, FlatList } from 'react-native';
import { Card, Button, Icon, SearchBar } from 'react-native-elements';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

let itemArray = [
  {
    name: "pest control",
    price: "$8.00/hour" ,
    desc: "Arrives at 6:00 to 7:00 AM to 6:00 to 7:00 PM unless all pests have been eradicated",
    datePosted: "5 days ago",
    distance: "10 mile away",
    id: 1
  },
  {
    name: "cherry picker",
    price: "$10.00/hour" ,
    desc: "We're a family service and arrive as a group",
    datePosted: "30 days ago",
    distance: "1 mile away",
    id: 2
  },
  {
    name: "apple picker",
    price: "$8.00/hour" ,
    desc: "Experienced in the field for the past 20 years",
    datePosted: "5 days ago",
    distance: "17 miles away",
    id: 3
  },
  {
    name: "animal feeding",
    price: "$10.00/hour" ,
    desc: "Has a background in veteranian training, good with animals",
    datePosted: "10 days ago",
    distance: "7 miles away",
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

export default function JobsScreen({ navigation }: RootStackScreenProps<'Jobs'>) {
  return (
    <View style={styles.container}>
        <Text>Welcome to the Jobs Screen!</Text>
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
