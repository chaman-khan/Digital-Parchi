import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './src/app/store';
import MainNav from './src/navigation/MainNav';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainNav />
      </PersistGate>
    </Provider>
  );
}

export default App;
