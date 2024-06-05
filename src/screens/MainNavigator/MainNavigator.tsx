import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from './LandingScreen/LandingScreen';
import IndividualPhoto from './IndividualPhoto/IndividualPhoto';
import type {StackNavigationProp} from '@react-navigation/stack';
import CameraFrame from '../../components/CameraFrame/CameraFrame';

export type MainNavigatorStackList = {
  LandingPage: undefined;
  IndividualPhoto: undefined;
  CameraFrame: undefined;
};

export type MainUseNavigationProps<
  ScreenName extends keyof MainNavigatorStackList = 'LandingPage',
> = StackNavigationProp<MainNavigatorStackList, ScreenName>;

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<MainNavigatorStackList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{title: 'Pictures Everywhere'}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="IndividualPhoto" component={IndividualPhoto} />
        <Stack.Screen name="CameraFrame" component={CameraFrame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
