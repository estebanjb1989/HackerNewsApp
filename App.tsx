import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import notifee from '@notifee/react-native';
import store, { persistor } from "@store/store";
import { NetworkProvider } from 'react-native-offline';
import { AppNavigation } from "./src/navigation"


function App(): React.JSX.Element {
  return (
    <NetworkProvider
      pingTimeout={15000}
      pingInterval={30000}
      pingOnlyIfOffline
      pingInBackground
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </NetworkProvider>
  )
}

export default App;
