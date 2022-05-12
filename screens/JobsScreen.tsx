import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-elements';
import { IconButton, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from 'react-native-platform-searchbar';
import jwt_decode from "jwt-decode";
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import Grid from '../components/Grid';
import AddItemOverlay from '../components/AddItemOverlay';
import Item from '../components/objects/Item';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  const [role, setRole] = useState('');
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
    navigation.addListener('focus', () => {
      getUserRole();
      getJobs();
    })
  }, []);

  useEffect(() => {
    getUserRole();
    getJobs();

  }, [render, search, filter]);

  const getUserId = async () => {
    var userId = ""
    try {
      const token = await AsyncStorage.getItem('auth-token');
      if (token != null) {
        var decoded_token: { _id: string } = jwt_decode(token);
        userId = decoded_token._id;
      }
    }
    catch (e) {
      console.log("damn it");
    }
    return userId;
  }

  const getUserRole = async () => {
    const userId = await getUserId();

    await axios.get('https://nodejs-ifarmo.herokuapp.com/api/users/' + userId)
      .then(res => {
        setRole(res.data.role);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const getJobs = async () => {
    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/jobs?searchKey=${search}&filter=${filter}`)
      .then(res => {
        console.log("GET JOBS");
        setItemArray(res.data);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const postJob = async (job: any) => {
    let token: any = await AsyncStorage.getItem("auth-token");
    console.log("token: ", JSON.stringify(token));

    await axios.post('https://nodejs-ifarmo.herokuapp.com/api/jobs', job, {
      headers: {
        'auth-token': token
      }
    }).then(res => {
      console.log("postJob() res: ", res);
      setRender(true);
      setOverlayVisible(false);
    }).catch(err => {
      alert(err.response.request._response);
      console.log(err.response.request._response);
    });
  }

  const toggleAddItemOverlay = () => {
    setOverlayVisible(!overlayVisible);
  }

  return (
    <Provider>
      <View style={[styles.container]}>
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 0 }}>
          <SearchBar
            placeholder='Search'
            // autoCapitalize={'none'}
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
                setFilter('');
                setFilterVisible(false);
              }}
              title="All jobs" />
            <Menu.Item
              onPress={() => {
                setFilter('farmer');
                setFilterVisible(false);
              }}
              title="I am job searching" />
            <Menu.Item
              onPress={() => {
                setFilter('worker');
                setFilterVisible(false);
              }}
              title="I am hiring" />
          </Menu>
        </View>
        <Grid items={itemArray} type='jobs' render={() => setRender(!render)} />
        {role !== 'user'
          ? <FAB
            visible={fabVisible}
            icon={{ name: 'add', color: 'white' }}
            color="green"
            onPress={toggleAddItemOverlay}
            style={styles.fab}
          />
          : <View></View>
        }
        <AddItemOverlay
          isVisible={overlayVisible}
          postItem={postJob}
          onBackdropPressHandler={toggleAddItemOverlay}
          type='jobs'
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
    backgroundColor: '#FFF5EA',
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
