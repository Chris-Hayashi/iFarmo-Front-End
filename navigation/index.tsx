/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationHelpersContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, ColorSchemeName, Pressable, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/* Screens */
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProduceScreen from '../screens/ProduceScreen';
import JobsScreen from '../screens/JobsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  // const [isUserProfile, setIsUserProfile] = React.useState(false);
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ headerShown: true, headerStyle: { backgroundColor: '#FFF5EA' } }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation }: RootTabScreenProps<'HomeTab'>) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerLeft: () =>
          <Icon
            name='user'
            type='font-awesome-5'
            // color='#444444'
            solid={true}
            style={styles.profileIcon}
            onPress={() => {
              // setIsUserProfile(true);
              navigation.navigate('UserProfile');
            }}
          />,
        headerRight: () =>
          <Icon
            name='log-out'
            type='feather'
            // color='#1F622A'
            containerStyle={styles.logoutIcon}
            onPress={async () => {
              await AsyncStorage.removeItem('auth-token');
              navigation.navigate('Login');
            }}
          />,
        tabBarStyle: styles.header,
        tabBarActiveTintColor: '#1F822A',
        // tabBarActiveTintColor: Colors[colorScheme].tint,

      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProduceTab"
        component={ProduceScreen}
        options={{
          title: 'Produce',
          tabBarIcon: ({ color }) => <TabBarIcon name="seedling" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="JobsTab"
        component={JobsScreen}
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <TabBarIcon name="suitcase" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="EquipmentTab"
        component={EquipmentScreen}
        options={{
          title: 'Equipment',
          tabBarIcon: ({ color }) => <TabBarIcon name="tractor" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

function Header(props: any) {
  return (
    <View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFF5EA'
  },
  profileIcon: {
    marginLeft: 20
  },
  logoutIcon: {
    marginRight: 10
  }
});