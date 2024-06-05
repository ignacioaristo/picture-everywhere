import React from 'react';
import {Image, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavigatorStackList} from '../MainNavigator';

const IndividualPhoto: React.FC = () => {
  const route =
    useRoute<RouteProp<MainNavigatorStackList, 'IndividualPhoto'>>();

  return (
    <View>
      <Image
        style={{resizeMode: 'cover', width: '100%', height: '80%'}}
        source={{uri: route.params.photo}}
      />
      <Text>Photo</Text>
    </View>
  );
};

export default IndividualPhoto;
