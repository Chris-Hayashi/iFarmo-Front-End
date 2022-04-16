import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Card, FAB, Input, Overlay, Button, Text, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import SearchBar from 'react-native-platform-searchbar';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import axios from 'axios';
import { addEventListener } from 'expo-linking';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [fabVisible, setFabVisible] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [prodDescOverlayVisible, setProdDescOverleyVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [itemClicked, setItemClicked] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
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
    'description': '',
    'quantity': '',
    'unitType': '',
    'price': ''
  };


  type OverlayComponentProps = {};
  type SearchBarComponentProps = {};

  useEffect(() => {
    getProducts();
    console.log("useEffect() executed");

  }, [render, search]);

  // function to map through product types and return image location
  function getProductImage(type: string) {
    switch (type) {
      case 'Vegetable':
        return require('../assets/images/vegetables.png');
      case 'Fruit':
        return require('../assets/images/fruits.png');
      case 'Nuts':
        return require('../assets/images/nuts.png');
      case 'Meat':
        return require('../assets/images/meat.png');
      case 'Dairy':
        return require('../assets/images/dairy.png');
      case 'Grains':
        return require('../assets/images/grains.png');
      case 'Baked Goods':
        return require('../assets/images/baked_goods.png');
      case 'Plants':
        return require('../assets/images/plants.png');
      case 'Other':
        return require('../assets/images/other.png');
      default:
        return require('../assets/images/other.png');
    }
  }


  /* search and filter function */
  /* filter values: by_date by_price*/
  const getProducts = async () => {
    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/products?searchKey=${search}&filter=${filter}`)
      .then(res => {
        console.log("GET PRODUCTS");
        // if (search != '')
        // console.log("res.data: ", res.data);
        setItemArray(res.data);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const postProduct = async () => {
    let token: any = await AsyncStorage.getItem("auth-token");
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
    return;
  }

  const toggleProdDescOverley = () => {
    // setItemIndex(index);
    setProdDescOverleyVisible(!prodDescOverlayVisible);
    return;
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
            onChangeText={(value) => productObj.description = value}
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

  const ProdDescOverlay = ({ items }: any) => {
    if (items[itemIndex] == undefined)
      return (<View></View>);
    return (
      <View>
        <Overlay
          isVisible={prodDescOverlayVisible}
          onBackdropPress={toggleProdDescOverley}
          overlayStyle={styles.overlay}
        >
          <Text h2={true} style={styles.prodName}>{items[itemIndex].name}</Text>
          <Image
            source={getProductImage(items[itemIndex].type)}
            style={styles.prodImage}
          // PlaceholderContent={<ActivityIndicator />}
          />

          <Text h4={true} style={styles.prodMargin}>Description</Text>
          <Text>{items[itemIndex].description}</Text>
          <Text style={styles.prodMargin}>Quantity: {items[itemIndex].quantity}</Text>
          <Text>${items[itemIndex].price} / {items[itemIndex].unitType}</Text>
        </Overlay>
      </View>
    );
  };

  const Grid = ({ items }: any) => {
    return (
      <View style={styles.grid}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <Card containerStyle={styles.gridCard}>
              <ProdDescOverlay items={items} />
              <TouchableOpacity
                onPress={() => {
                  toggleProdDescOverley();
                  setItemIndex(index);
                }}>
                {/* Card Content */}
                {/* <Text style={styles.itemUserPosted}>{item.userPosted}</Text> */}
                <Card.Image
                  style={{ padding: 0 }}
                  source={
                    // uri:
                    getProductImage(item.type)
                  }
                />
                {/* <ProductImage itemType={item.type} /> */}
                <Card.Divider />
                <Card.Title style={styles.itemName}>{item.name}</Card.Title>
                <Text style={styles.itemPrice}>${item.price} / {item.unitType}</Text>
                {/* <Text style={styles.itemDistance}>{item.distance}</Text> */}
              </TouchableOpacity>
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
      <View style={{display: 'flex', flexDirection: 'row'}}>
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
        <Icon
          name='filter'
          type='font-awesome-5'
          solid={true}
          style={styles.filterIcon}
        />
      </View>

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
  },
  prodName: {
    textAlign: 'center'
  },
  prodMargin: {
    marginTop: 25,
    marginBottom: 10
  },
  prodImage: {
    // alignItems: 'center',
    maxWidth: 200,
    maxHeight: 200,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  prodQuantity: {

  },
  filterIcon: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  searchBar: {
    flex: 1,
    marginLeft: 10
  }
});


