import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card, FAB, Input, Overlay, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import SearchBar from 'react-native-platform-searchbar';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import axios from 'axios';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  const [search, setSearch] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [fabVisible, setFabVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [render, setRender] = useState(false);

  const productTypes = [
    { label: 'Vegetable', value: '1' },
    { label: 'Fruit', value: '2' },
    { label: 'Nuts', value: '3' },
    { label: 'Meat', value: '4' },
    { label: 'Dairy', value: '5' },
    { label: 'Grains', value: '6' },
    { label: 'Baked Goods', value: '7' },
    { label: 'Plants', value: '8' },
    { label: 'Other', value: '9' },
  ];
  const unitTypes = [
    { label: 'lb', value: '1' },
    { label: 'kg', value: '2' },
    { label: 'g', value: '3' },
    { label: 'piece', value: '4' }
  ]
  let selectedProductType: any = null;
  let selectedUnitType: any = null;

  let productObj = {
    'name': '',
    'type': '',
    'desc': '',
    'quantity': '',
    'unitType': '',
    'price': '',
    'postedBy': '6232700bbdd46b5c84658ae6'
  };


  type OverlayComponentProps = {};
  type SearchBarComponentProps = {};

  useEffect(() => {
    getProducts();

  }, [render]);

  const getProducts = () => {
    axios.get("https://nodejs-ifarmo.herokuapp.com/api/products")
      .then(res => {
        console.log("GET PRODUCTS");
        setItemArray(res.data);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const postProduct = async() => {
    let token : any = await AsyncStorage.getItem("auth-token");
    console.log("token: ", JSON.stringify(token));

    axios.post('https://nodejs-ifarmo.herokuapp.com/api/products', productObj, {
      headers: {
        'auth-token': token
      }
    }).then(res => {
      console.log("postProduct() res: ", res);
      setRender(true);
      setOverlayVisible(false);
    }).catch(err => {
      alert(err.response.request._response);
      console.log(err.response.request._response);
    });
  }

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  }

  const AddItemOverlay = () => {
    return (
      <View>
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlay}
        >
          {/* Add Item Form */}

          <Input placeholder="Product Name" onChangeText={(value) => productObj.name = value} />
          {/* <Text style={styles.dropdownLabel}>Product Type</Text> */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder}
            data={productTypes}
            labelField='label'
            valueField='value'
            value={productObj.type}
            placeholder={'Select Product Type'}
            onChange={item => {
              productObj.type = item.label;
            }}
          />
          <Input placeholder='Description'
            onChangeText={(value) => productObj.desc = value}
            style={{ marginTop: 15 }}
          />
          <Input placeholder='Quantity'
            onChangeText={(value) => productObj.quantity = value}
            style={{ marginTop: 10 }}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder}
            data={unitTypes}
            labelField='label'
            valueField='value'
            value={productObj.unitType}
            placeholder={'Select Unit Type'}
            onChange={item => {
              productObj.unitType = item.label;
            }}
          />
          <Input placeholder='Price'
            onChangeText={(value) => productObj.price = value}
            style={{ marginTop: 15 }} />

          <Button title='Add Product'
            // color='black'
            style={styles.addProductBtn}
            onPress={() => {
              postProduct();
            }}
          />

        </Overlay>
      </View>
    );
  }

  const Grid = ({ items }: any) => {
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

  // const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = () => {
  //   const [search, setSearch] = useState("");

  // const updateSearch = (search: any) => {
  //   setSearch(search);
  // }
  return (
    <View style={[styles.container]}>
      <SearchBar
        placeholder='Search'
        onChangeText={setSearch}
        value={search}
        platform='ios'
        theme='light'
      />
      <Grid items={itemArray} />
      <FAB
        visible={fabVisible}
        icon={{ name: 'add', color: 'white' }}
        color="green"
        onPress={toggleOverlay}
        style={styles.fab}
      />
      <AddItemOverlay />

    </View>
  );
};

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
    height: 1,
    width: '80%',
    color: 'black'
  },
  grid: {
    flexDirection: "row"
  },
  gridCard: {
    flex: 3
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
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 25
  },
  overlay: {
    width: '80%',
    height: '60%',
    maxWidth: 500,
    maxHeight: 600,
    padding: 25,
    elevation: 0
  },
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderBottomColor: 'black',
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    borderWidth: 0.5,
    borderRadius: 8,
    width: '95%',
    left: 10,
    bottom: 8
  },
  dropdownLabel: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16
  },
  placeholder: {
    color: 'grey'
  },
  addProductBtn: {
    marginTop: 35
  }
});
