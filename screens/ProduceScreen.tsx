import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Icon } from 'react-native-elements';
import { IconButton, Menu, Divider, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from 'react-native-platform-searchbar';
// import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import Grid from '../components/Grid';
import AddItemOverlay from '../components/AddItemOverlay'

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [fabVisible, setFabVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [render, setRender] = useState(false);

  type OverlayComponentProps = {};
  type SearchBarComponentProps = {};

  useEffect(() => {
    getProducts();
  }, [render, search, filter]);

  const getProducts = async () => {
    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/products?searchKey=${search}&filter=${filter}`)
      .then(res => {
        setItemArray(res.data);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const postProduct = async (productObj: {}) => {
    let token: any = await AsyncStorage.getItem("auth-token");

    axios.post('https://nodejs-ifarmo.herokuapp.com/api/products', productObj, {
      headers: {
        'auth-token': token
      }
    }).then(res => {
      setRender(true);
      setOverlayVisible(false);
    }).catch(err => {
      alert(err.response.request._response);
      console.log(err.response.request._response);
    });
  }

  const toggleAddItemOverlay = () => {
    setOverlayVisible(!overlayVisible);
    return;
  }

  return (
    <Provider>
      <View style={[styles.container]}>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}>
          <SearchBar
            placeholder='Search'
            onChangeText={(val) => {
              setSearch(val);
              // getProducts();
            }}
            value={search}
            platform='ios'
            theme='light'
            style={styles.searchBar}
          />
          <Menu
            visible={filterVisible}
            onDismiss={() => setFilterVisible(false)}
            style={styles.menu}
            anchor={
              <IconButton icon='filter' size={25} style={styles.filterIcon} onPress={() => setFilterVisible(true)} />
            }
          >
            <Menu.Item
              onPress={() => {
                setFilter('by_date');
                setFilterVisible(false);
              }}
              title="Sort by date"
            />
            <Menu.Item
              onPress={() => {
                setFilter('by_price');
                setFilterVisible(false);
              }}
              title="Sort by price" />
          </Menu>
        </View>

        <Grid items={itemArray} type='products' />
        <FAB
          visible={fabVisible}
          icon={{ name: 'add', color: 'white' }}
          color="green"
          onPress={toggleAddItemOverlay}
          style={styles.fab}
        />
        <AddItemOverlay
          isVisible={overlayVisible}
          postItem={postProduct}
          onBackdropPressHandler={toggleAddItemOverlay}
        />

      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 25,
    padding: 5,
    paddingTop: 15
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 25
  },
  filterIcon: {
    flex: 1,
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 10
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10
  },
  menu: {
    top: 60
  }
});


