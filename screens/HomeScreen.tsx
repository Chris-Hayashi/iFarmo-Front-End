import { StyleSheet, Text, View } from 'react-native';

// import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function ProduceScreen({ navigation }: RootStackScreenProps<'Produce'>) {
  return (
    <View style={styles.container}>
        <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
