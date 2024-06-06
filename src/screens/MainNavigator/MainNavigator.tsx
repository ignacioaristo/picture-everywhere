import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage from './LandingScreen/LandingScreen';
import IndividualPhoto from './IndividualPhoto/IndividualPhoto';
import CameraFrame from './CameraFrame/CameraFrame';
import type {StackNavigationProp} from '@react-navigation/stack';

export type MainNavigatorStackList = {
  LandingPage: undefined;
  CameraFrame: {
    callback: ({}) => void;
    photos: any;
  };
  IndividualPhoto: {
    photo: string;
    location: string;
  };
};

export type MainUseNavigationProps<
  ScreenName extends keyof MainNavigatorStackList = 'LandingPage',
> = StackNavigationProp<MainNavigatorStackList, ScreenName>;

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<MainNavigatorStackList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: 'Pictures Everywhere',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="IndividualPhoto" component={IndividualPhoto} />
        <Stack.Screen
          name="CameraFrame"
          component={CameraFrame}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
