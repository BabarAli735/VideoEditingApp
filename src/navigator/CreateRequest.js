import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestCategory from '../screens/createRequest/requestCategory';
import SubCategory from '../screens/createRequest/subCategory';

const Stack = createNativeStackNavigator();

export default function CreateRequest() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RequestCategory"
        component={RequestCategory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SubCategory"
        component={SubCategory}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
