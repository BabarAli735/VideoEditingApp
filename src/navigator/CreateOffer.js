import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OfferCategory from '../screens/createOffer/offerCategory/index';
import OfferSubCategory from '../screens/createOffer/offerSubCategory';

const Stack = createNativeStackNavigator();

export default function CreateOffer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OfferCategory"
        component={OfferCategory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OfferSubCategory"
        component={OfferSubCategory}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
