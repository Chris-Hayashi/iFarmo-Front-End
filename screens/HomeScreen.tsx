import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements';
import SearchBar from 'react-native-platform-searchbar';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';



export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  const [search, setSearch] = useState("");

  let itemArray = [
    {
      name: "apples",
      price: "$3.99/pound",
      desc: "McIntosh",
      datePosted: "1 day ago",
      distance: "5 miles away",
      id: 1
    },
    {
      name: "bananas",
      price: "$3.99/pound",
      desc: "Cavendish",
      datePosted: "4 days ago",
      distance: "10 miles away",
      id: 2
    },
    {
      name: "oranges",
      price: "$3.99/pound",
      desc: "Blood",
      datePosted: "a week ago",
      distance: "15 miles away",
      id: 3
    },
    {
      name: "strawberries",
      price: "$4.99/pound",
      desc: "Alpine",
      datePosted: "two weeks ago",
      distance: "10 miles away",
      id: 4
    },
    {
      name: "blueberries",
      price: "$1.99/pound",
      desc: "rabbiteye",
      datePosted: "a week ago",
      distance: "4 miles away",
      id: 5
    },
    {
      name: "Grapefruit",
      price: "$9.99/unit",
      desc: "White & Pink",
      datePosted: "4 days ago",
      distance: "5 miles away",
      id: 6
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
  type SearchBarComponentProps = {};

  // const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
  //   const [search, setSearch] = useState("");

    const updateSearch = (search: any) => {
      setSearch(search);
    }
    return (
      <View style={[styles.container]}>
        <SearchBar
          placeholder='Search'
          onChangeText={setSearch}
          value={search}
          platform='ios'
          theme='light'
        />
        {/* <Text>Welcome to the Home Screen!</Text> */}
        <Grid items={itemArray} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 5
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%'
    },
    grid: {
      flexDirection: "row"
    },
    gridCard: {
      flex: 3
      // width: 15
    }
  });
