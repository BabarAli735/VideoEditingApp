import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '../screens/auth';
import PersonalDetail from '../screens/auth/onboarding/personalDetail/Index';
import MapScreen from '../screens/auth/onboarding/personalDetail/MapScreen';
import GoogleSearch from '../screens/auth/onboarding/personalDetail/MapScreen/GoogleSearch';
import Preview from '../screens/auth/onboarding/personalDetail/Preview';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="App"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
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
      <Stack.Screen
        name="OnboardingPreview"
        component={Preview}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
