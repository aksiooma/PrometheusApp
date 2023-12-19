import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Prometheus from './Prometheus'
import Storybase from './Storybase'
import StoryProvider from './components/context/StoryProvider';
import StoryDetail from './components/StoryDetail';



const PrometheusStack = createNativeStackNavigator();

function PrometheusStackScreen() {

  return (
    <PrometheusStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true, headerStatusBarHeight: 0, }}>
      <PrometheusStack.Screen name="PrometheusStack" component={Prometheus} />
      <PrometheusStack.Screen name="StorybaseStack" component={Storybase} />
    </PrometheusStack.Navigator>
  );
}


const StoryStack = createNativeStackNavigator();

function StoryStackScreen() {
  return (

    <StoryStack.Navigator
      screenOptions={{ headerTitle: '', headerTransparent: true, headerStatusBarHeight: 0, }}>
      <StoryStack.Screen component={Storybase} name='StorybaseStack' />
      <StoryStack.Screen component={StoryDetail} name='StoryDetail' />

    </StoryStack.Navigator>

  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <StoryProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Prometheus') {
                iconName = 'flame-outline';
              } else if (route.name === 'Storybase') {
                iconName = 'cloud-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            // headerStyle: {
            // backgroundColor: '#181818',},
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            // fontWeight: 'bold',
            // },


          })}>
          <Tab.Screen name='Prometheus' component={PrometheusStackScreen} />
          <Tab.Screen name='Storybase' component={StoryStackScreen} />

        </Tab.Navigator>
      </StoryProvider>
    </NavigationContainer >

  );
}