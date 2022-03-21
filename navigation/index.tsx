/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/* Screens */
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProduceScreen from '../screens/ProduceScreen';
import JobsScreen from '../screens/JobsScreen';
import EquipmentScreen from '../screens/EquipmentScreen';
import UserProfile from '../screens/UserProfile';
import EditProfile from '../screens/EditProfile';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import { Text, View } from '../components/Themed';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator}
        options={{ headerShown: false, headerTitle: (props: any) => <Header {...props} /> }} />
      {/* <Stack.Screen name="Home" component={BottomTabNavigator}
         options={{headerShown: false, headerTitle: (props : any) => <Header {...props} /> }} /> */}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
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
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function Header(props: any) {
  return (
    <View style={styles.header}>
      <Text> test </Text>
      {/* <FontAwesome size={30} style={{ marginBottom: -3}} name='car'/> */}
      {/* <Text> test </Text> */}
    </View>
    // <Image
    //   style={{ width: 50, height: 50 }}
    //   source={require('@expo/snack-static/react-native-logo.png')}
    // />
  );
}

const styles = StyleSheet.create({
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  }
});