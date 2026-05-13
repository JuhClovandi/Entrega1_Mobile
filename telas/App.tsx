import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/screens/WelcomeScreen';
import RoleScreen from './src/screens/RoleScreen';
import RegisterScreen from './src/screens/RegisterScreen'; 
import RegisterProScreen from './src/screens/RegisterProScreen'; 
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import ListingScreen from './src/screens/ListingScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import RequestServiceScreen from './src/screens/RequestServiceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#111',
        tabBarStyle: { backgroundColor: '#A0A4AB', height: 62 },
        tabBarLabelStyle: { fontSize: 11, marginBottom: 6 },
        tabBarIconStyle: { marginTop: 6 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Serviços"
        component={ListingScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🗓️</Text>,
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>💬</Text>,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>👤</Text>,
        }}
      />
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
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="RequestService" component={RequestServiceScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}