import { StyleSheet } from 'react-native';
import {CreateStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';


import Login from './Screens/Login';
import CriarLogin from './Screens/CriarLogin';
import Home from './Screens/Home';



export default function App() {

  const Stack = CreateStackNavigator() 
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CriarLogin" component={CriarLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
