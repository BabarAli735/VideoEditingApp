import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile';
import ProfileMapScreen from '../screens/profile/ProfileMapScreen';
import GoogleSearch from '../screens/profile/GoogleSearch';
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileMap"
        component={ProfileMapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GoogleSearch"
        component={GoogleSearch}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
