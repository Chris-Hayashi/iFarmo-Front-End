# iFarmo

## Installation
### Expo CLI
1. ```npm install -g expo-cli```
2. Set up XCode and Android Studio
    - Follow this doc: https://reactnative.dev/docs/environment-setup
- *Note: Windows Machines do **NOT** support iOS development for Native code*

### React-Native CLI

1. ```brew install node```
2. ```brew install watchman```
3. install Xcode Command Line Tools (in Xcode, go to preferences -> locations 
    -> select most recent CLI from dropdown)
4. Install iOS simulator in Xcode (in Xcode, go to preferences -> Components 
    -> click the download icon next to the iOS version you want)
5. Install Cocoapods
```
sudo gem install cocoapods
```
6. Install React Native (may not be exact command)
```
npx install react-native 
```

*Note: install cocoapods with the following command *

## Running the Application (Expo CLI)
1. Clone repo
2. ``` cd Front-End ```
3. ``` npm install ```
4. - ```npm run ios```
   - ```npm run android```
   - ```npm run web```
   - ```npm start``` (afterwards, press **a**, **i**, or **w** to run in android iOS, or web respectively)
