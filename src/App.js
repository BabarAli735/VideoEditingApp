import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import auth from '@react-native-firebase/auth';
import {QueryClient, QueryClientProvider} from 'react-query';

import Navigator from './navigator';
import {checkUserInDB} from './services/api';
import {
  isOnBoardingCompleted,
  saveAuthUserLocal,
  saveDBUserLocal,
} from './utils/utils';
import {useStartUp} from './stores/startUp';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  const setStartUpProps = useStartUp(state => state.setInitialRouteName);

  React.useEffect(() => {
    const init = async () => {
      // do multiple sync or async tasks
      try {
        let authUser = auth().currentUser;

        if (authUser) {
          const {_user} = authUser;
          const {uid} = _user;
          const dbUser = await checkUserInDB(uid);

          await saveAuthUserLocal(_user);
          await saveDBUserLocal(dbUser);

          const isBoarded = isOnBoardingCompleted(dbUser);

          if (isBoarded) {
            await setStartUpProps('App');
          } else {
            await setStartUpProps('Auth');
          }
        } else {
          await setStartUpProps('Auth');
        }
      } catch (error) {
        console.error(error);
      }
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, [setStartUpProps]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <Navigator />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
