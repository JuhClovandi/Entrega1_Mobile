import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/screens/WelcomeScreen';
import RoleScreen from './src/screens/RoleScreen';
import RegisterScreen from './src/screens/RegisterScreen'; 
import RegisterProScreen from './src/screens/RegisterProScreen'; 
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ListingScreen from './src/screens/ListingScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import RequestServiceScreen from './src/screens/RequestServiceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Serviços" component={ListingScreen} />
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        
        <Stack.Screen name="RoleScreen" component={RoleScreen} />
        <Stack.Screen name="RegisterClient" component={RegisterScreen} /> 
        <Stack.Screen name="RegisterPro" component={RegisterProScreen} /> 
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Login" component={MainTabs} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="RequestService" component={RequestServiceScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}