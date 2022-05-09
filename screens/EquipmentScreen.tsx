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
import * as FileSystem from 'expo-file-system';

export default function EquipmentScreen({ navigation }: RootStackScreenProps<'Equipment'>) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [fabVisible, setFabVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [render, setRender] = useState(false);

  const equipmentTypes = [
    { label: 'Tools', value: '1' },
    { label: 'Heavy Machinery', value: '2' },
    { label: 'Vehicles', value: '3' },
    { label: 'Other', value: '4' },
  ];
  const unitTypes = [
    { label: 'units', value: '1' }
  ]
  let selectedEquipmentType: any = null;
  let selectedUnitType: any = null;

  // let equipmentObj = {
  //   'title': '',
  //   'desc': '',
  //   'price': '',
  //   'type': '',
  //   'quantity': '',
  //   'unitType': ''
  // };


  type OverlayComponentProps = {};
  type SearchBarComponentProps = {};

  useEffect(() => {
    getEquipment();

  }, [render, search, filter]);

  const getEquipment = () => {
    axios.get(`https://nodejs-ifarmo.herokuapp.com/api/equipments?searchKey=${search}&filter=${filter}`)
      .then(res => {
        console.log("GET EQUIPMENT");
        setItemArray(res.data);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const postEquipment = async (equipment: Record<string, string>, imageUri: string) => {
    let token: any = await AsyncStorage.getItem("auth-token");

    let options = {
      headers: {
        'auth-token': token
      },
      fieldName: 'image',
      mimeType: 'image/jpeg',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      parameters: equipment
    };

    await FileSystem.uploadAsync('https://nodejs-ifarmo.herokuapp.com/api/equipments', imageUri, options)
      .then(res => {
        console.log(res);
        setRender(true);
        setOverlayVisible(false);
      })
      .catch(err => {
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
              title="All Equipment" />
            <Menu.Item
              onPress={() => {
                setFilter('Tools');
                setFilterVisible(false);
              }}
              title="Tools" />
            <Menu.Item
              onPress={() => {
                setFilter('Machinery');
                setFilterVisible(false);
              }}
              title="Machinery" />
            <Menu.Item
              onPress={() => {
                setFilter('Materials');
                setFilterVisible(false);
              }}
              title="Materials" />
            <Menu.Item
              onPress={() => {
                setFilter('Other');
                setFilterVisible(false);
              }}
              title="Other" />
          </Menu>
        </View>
        <Grid items={itemArray} type='equipments' />
        <FAB
          visible={fabVisible}
          icon={{ name: 'add', color: 'white' }}
          color="green"
          onPress={toggleAddItemOverlay}
          style={styles.fab}
        />
        <AddItemOverlay isVisible={overlayVisible} postItem={postEquipment} onBackdropPressHandler={toggleAddItemOverlay} />

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