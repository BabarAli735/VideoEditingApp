import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable} from 'react-native';

import HomeScreen from '../screens/home';
import ApplicationsScreen from '../screens/applications';
import ChatScreen from '../screens/chat';
import CreateScreen from '../screens/create';
import ProfileTabStack from './ProfileTabStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {APP_PRIMARY_COLOR} from '../constants/color';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: APP_PRIMARY_COLOR,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let name = 'home-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({color, size}) => {
            let name = 'notification';
            return <AntDesign name={name} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={({navigation}) => ({
          tabBarLabel: () => {
            return null;
          },

          tabBarButton: props => {
            return (
              <Pressable
                {...props}
                onPress={() =>
                  navigation.navigate('Root', {
                    screen: 'acknowledge',
                    params: {
                      navigator: 'Root',
                      screen: 'requestDetailStack',
                    },
                  })
                }
              />
            );
          },

          tabBarIcon: ({size}) => {
            let name = 'add-circle';
            return (
              <Ionicons
                name={name}
                size={size + 20}
                color={APP_PRIMARY_COLOR}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({color, size}) => {
            let name = 'ios-chatbubble-ellipses-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileTabStack}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({color, size}) => {
            let name = 'person-outline';
            return <Ionicons name={name} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
