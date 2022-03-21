/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

 import { LinkingOptions } from '@react-navigation/native';
 import * as Linking from 'expo-linking';
 
 import { RootStackParamList } from '../types';
 
 const config = {
   screens: {
     Login: 'login',
     Register: 'register',
     Home: {
       screens: {
         HomeTab: 'home',
         ProduceTab: 'produce',
         TabOne: 'one',
         TabTwo: 'two',
         UserProfile: 'userProfile'
       }
     }
   }
 }
 
 const linking: LinkingOptions<RootStackParamList> = {
   prefixes: [Linking.makeUrl('/')],
   config
 
   // config: {
   //   screens: {
   //     Root: {
   //       screens: {
 
   //         /* Maybe can work as the page that sends you to your page after logging in */
   //         TabOne: {
   //           path: 'one'
   //           // screens: {
   //           //   TabOneScreen: 'one',
   //           // },
   //         },
   //         TabTwo: {
   //           path: 'two'
   //         },
   //       },
   //     },
   //     Modal: 'modal',
   //     NotFound: '*',
   //   },
   // },
 
 };
 
 export default linking;
 