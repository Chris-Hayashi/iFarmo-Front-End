import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-elements';
import SearchBar from 'react-native-platform-searchbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Grid from '../components/Grid';


// import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ProduceScreen({ navigation }: RootStackScreenProps<'Produce'>) {

  const [role, setRole] = useState('');
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [search, setSearch] = useState('');
  const [render, setRender] = useState(false);

  // Runs when home tab is clicked
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserRole();
      getProductsByUser();
      getJobsByUser();
      getEquipmentsByUser();
    })
  }, []);

  // Runs when render and search
  useEffect(() => {
    getUserRole();
    getProductsByUser();
    getJobsByUser();
    getEquipmentsByUser();
  }, [render, search]);

  const getUserId = async () => {
    var userId = ""
    try {
      const token = await AsyncStorage.getItem('auth-token');
      if (token != null) {
        var decoded_token: { _id: string } = jwt_decode(token);
        // console.log("decoded token: ", decoded_token);
        userId = decoded_token._id;
      }
    }
    catch (e) {
      console.log("damn it");
    }
    return userId;
  }

  //get user information
  const getUserRole = async () => {
    const userId = await getUserId();

    axios.get('https://nodejs-ifarmo.herokuapp.com/api/users/' + userId)
      .then(res => {
        // not sure how to get this to work @CHRIS
        setRole(res.data.role);
      })
      .catch(err => {
        alert(err.response.request._response);
        console.log(err.response.request._response);
      });
  }

  const getProductsByUser = async () => {
    let token: any = await AsyncStorage.getItem("auth-token");

    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/products/myproducts?searchKey=${search}`, {
      headers: {
        'auth-token': token
      }
    })
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err.response.request._response);
      });
  }

  const getJobsByUser = async () => {
    let token: any = await AsyncStorage.getItem("auth-token");

    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/jobs/myjobs?searchKey=${search}`, {
      headers: {
        'auth-token': token
      }
    })
      .then(res => {
        setJobs(res.data);
      })
      .catch(err => {
        console.log(err.response.request._response);
      });
  }

  const getEquipmentsByUser = async () => {
    let token: any = await AsyncStorage.getItem("auth-token");

    await axios.get(`https://nodejs-ifarmo.herokuapp.com/api/equipments/myequipments?searchKey=${search}`, {
      headers: {
        'auth-token': token
      }
    })
      .then(res => {
        setEquipments(res.data);
      })
      .catch(err => {
        console.log(err.response.request._response);
      });
  }

  return (
    <View style={styles.container}>
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
      </View>
      <ScrollView>

        {role === 'farmer'
          ?
          <View style={styles.container}>
            <Text h4={true} style={[styles.text, { marginTop: 0 }]}>Produce</Text>
            <Grid items={products} type='products' isHome={true} render={() => setRender(!render)} />
          </View>
          : <View></View>
        }

        {/* <View style={{padding: 0}}> */}
        <Text h4={true} style={styles.text}>Jobs</Text>
        {jobs.length === 0
          ? <Text style={[styles.text, { marginBottom: 10 }]}>You have not posted any jobs</Text>
          : <Grid items={jobs} type='jobs' isHome={true} render={() => setRender(!render)} />
        }
        {/* </View> */}
        {/* <Grid items={jobs} type='jobs' isHome={true} /> */}

        <Text h4={true} style={styles.text}>Equipment</Text>
        {equipments.length === 0
          ? <Text style={styles.text}>You have not posted any equipment</Text>
          : <Grid items={equipments} type='equipments' isHome={true} render={() => setRender(!render)} />
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFF5EA',
    padding: 5,
    paddingTop: 15,
    marginTop: 0
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
  scrollView: {
    margin: 0,
    padding: 0
  },
  text: {
    marginHorizontal: 10,
    color: '#666666'
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10
  },
});
