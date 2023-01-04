import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileVideo from '../screens/profile/ProfileVideo';
import RecordProfileVideo from '../screens/profile/RecordProfileVideo';
const Stack = createNativeStackNavigator();

export default function ProfileVideoStack({route}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileVideo"
        component={ProfileVideo}
        options={{
          headerShown: true,
          title: 'Profile Video',
        }}
        initialParams={route?.params}
      />
      <Stack.Screen
        name="RecordProfileVideo"
        component={RecordProfileVideo}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
