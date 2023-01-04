import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RequestDetail from '../screens/requestDetails';
import RequestSummary from '../screens/requestDetails/requestSummary';
import PreviewReqData from '../screens/dummyRequests/PreviewReqData';

const Stack = createNativeStackNavigator();

export default function RequestDetailStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="requestDetail"
        component={RequestDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="requestData"
        component={RequestSummary}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
