import React from 'react';

import MainNavigator from './src/screens/MainNavigator/MainNavigator';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return <MainNavigator />;
}

export default App;
