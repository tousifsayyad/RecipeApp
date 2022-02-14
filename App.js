import React, {useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';
import AppContainer from './src/navigations/AppNavigation';

export default function App() {
  useLayoutEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('#fff');
  });
  return <AppContainer />;
}
