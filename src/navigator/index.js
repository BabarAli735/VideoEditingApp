import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './App';
import AuthNavigator from './Auth';
import LetsConnect from '../screens/letsConnect';
import CameraScreen from '../screens/camera';
import RecordVideo from '../screens/camera/RecordVideo';
import PreviewRecording from '../screens/camera/PreviewRecording';
import Acknowledge from '../screens/acknowledge';
import MapDirections from '../screens/mapDirection';
import PreviewReqData from '../screens/dummyRequests/PreviewReqData';
import Preview from '../screens/letsConnect/Preview';
import RequestDetail from '../screens/dummyRequests/RequestData';

import ProfileVideoNavigator from './ProfileVideoStack';
import CreateRequest from './CreateRequest';
import CreateOffer from './CreateOffer';
import {useStartUp} from '../stores/startUp';
import RequestDetailStack from './RequestDetailStack';

import Maps from '../screens/map/index';
import RequestorProfile from '../screens/profile/RequestorProfile';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const initialRouteName = 'recordVideo';

  return (
    <>
      {initialRouteName ? (
        <Stack.Navigator initialRouteName={'recordVideo'}>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateRequest"
            component={CreateRequest}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateOffer"
            component={CreateOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProfileVideoStack"
            component={ProfileVideoNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="requestorProfile"
            component={RequestorProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="requestDetailStack"
            component={RequestDetailStack}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="acknowledge"
            component={Acknowledge}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="camera"
            component={CameraScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="recordVideo"
            component={RecordVideo}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="preview"
            component={PreviewRecording}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="mapDirection"
            component={MapDirections}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="previewReqData"
            component={PreviewReqData}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="requestDetail"
            component={RequestDetail}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Maps"
            component={Maps}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="letsConnectPreview"
            component={Preview}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : null}
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={MainNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
