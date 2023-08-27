import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppStack} from './navigators/app-stack';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <AppStack />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
