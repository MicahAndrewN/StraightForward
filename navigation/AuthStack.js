import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
// import ForgotPassword from '../screens/ForgotPassword';

// import { LoginForm } from '../screens';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator
        initialRouteName='Login'
      >
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{
          title: 'Drive StraightForward!',
          
        }}
      />
      {/* <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword}
        options={{
          title: 'Reset password',
          headerStyle: {
            backgroundColor: "white" ,
          },
          headerTintColor: 'rgb(237, 148, 66)',
          headerTitleStyle: {
            fontFamily: 'AvenirNext-Bold',
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: "#fff"
          }
          
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
