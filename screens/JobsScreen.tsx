import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-elements';
import { IconButton, Menu, Provider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from 'react-native-platform-searchbar';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import Grid from '../components/Grid';
import AddItemOverlay from '../components/AddItemOverlay';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [fabVisible, setFabVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [render, setRender] = useState(false);

  const jobTypes = [
    { label: 'Equipment Operator', value: '1' },
    { label: 'Laborer', value: '2' },
    { label: 'Other', value: '3' },
  ];
  const unitTypes = [
    { label: 'hr', value: '1' },
    { label: 'week', value: '2' },
    { label: 'month', value: '3' }
  ]
  let selectedJobType: any = null;
  let selectedUnitType: any = null;

  // let jobObj = {
  //   'type': '',
  //   'title': '',
  //   'desc': '',
  //   'salary': '',
  //   'timeUnit': '',
  // };


  type OverlayComponentProps = {};
  type SearchBarComponentProps = {};

  useEffect(() => {
    getJobs();

  }, [render, search, filter]);

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

  const postJob = async (job : any) => {
    let token: any = await AsyncStorage.getItem("auth-token");
    console.log("token: ", JSON.stringify(token));

    axios.post('https://nodejs-ifarmo.herokuapp.com/api/jobs', job, {
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
        <Grid items={itemArray} type='jobs' />
        <FAB
          visible={fabVisible}
          icon={{ name: 'add', color: 'white' }}
          color="green"
          onPress={toggleAddItemOverlay}
          style={styles.fab}
        />
        <AddItemOverlay
          isVisible={overlayVisible}
          postItem={postJob}
          onBackdropPressHandler={toggleAddItemOverlay}
          type='job'
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
