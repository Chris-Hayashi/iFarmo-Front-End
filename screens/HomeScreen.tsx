import { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements';
import SearchBar from 'react-native-platform-searchbar';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import axios from 'axios';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  const [search, setSearch] = useState("");
  const [newItemArray, setNewItemArray] = useState([]);
  // let newItemArray: any[] = [];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("https://nodejs-ifarmo.herokuapp.com/api/products")
    .then(res => {
      console.log("GET PRODUCTS");
      setNewItemArray(res.data);
    });
  }

  let itemArray = [
    {
      name: "apples",
      price: "$3.99/lb",
      desc: "McIntosh",
      userPosted: "chris",
      datePosted: "1 day ago",
      distance: "5 miles away",
      id: 1
    },
    {
      name: "bananas",
      price: "$3.99/lb",
      desc: "Cavendish",
      userPosted: "suds",
      datePosted: "4 days ago",
      distance: "10 miles away",
      id: 2
    },
    {
      name: "oranges",
      price: "$3.99/lb",
      desc: "Blood",
      userPosted: "ahror",
      datePosted: "a week ago",
      distance: "15 miles away",
      id: 3
    },
    {
      name: "strawberries",
      price: "$4.99/lb",
      desc: "Alpine",
      userPosted: "ahror2.0",
      datePosted: "two weeks ago",
      distance: "10 miles away",
      id: 4
    },
    {
      name: "blueberries",
      price: "$1.99/lb",
      desc: "rabbiteye",
      userPosted: "realahror",
      datePosted: "a week ago",
      distance: "4 miles away",
      id: 5
    },
    {
      name: "Grapefruit",
      price: "$9.99/lb",
      desc: "White & Pink",
      userPosted: "addison",
      datePosted: "4 days ago",
      distance: "5 miles away",
      id: 6
    },
  ];

  const Grid = ({ items }: any) => {
    items.map((item: any, key: any) => {
      console.log("map executed");
      console.log(item);
      // console.log(item.name);
    });
    return (
      <View style={styles.grid}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <Card containerStyle={styles.gridCard}>

              {/* Card Content */}
              {/* <Text style={styles.itemUserPosted}>{item.userPosted}</Text> */}
              <Card.Image
                style={{ padding: 0 }}
                source={{
                  uri:
                    'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                }}
              />
              <Card.Divider />
              <Card.Title style={styles.itemName}>{item.name}</Card.Title>
              <Text style={styles.itemPrice}>${item.price} / {item.unitType}</Text>
              {/* <Text style={styles.itemDistance}>{item.distance}</Text> */}

            </Card>
          )}
          numColumns={2}
        keyExtractor={(item, index) => index.toString()}
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
        <Grid items={newItemArray} />
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
    },
    itemUserPosted: {
      paddingBottom: 5
    },
    itemName: {
      textAlign: 'left'
    },
    itemPrice: {
      textAlign: 'right'
    },
    itemDistance: {
      textAlign: 'right'
    }

  });
