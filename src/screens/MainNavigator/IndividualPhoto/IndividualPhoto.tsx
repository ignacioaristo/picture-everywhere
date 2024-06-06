import React from 'react';
import {Image, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavigatorStackList} from '../MainNavigator';
import {styles} from './IndividualPhoto.styles';

const IndividualPhoto: React.FC = () => {
  const route =
    useRoute<RouteProp<MainNavigatorStackList, 'IndividualPhoto'>>();

  return (
    <View>
      <Image style={styles.image} source={{uri: route.params.photo}} />
      <View style={styles.location}>
        <Text>Picture location: {route.params.location}</Text>
      </View>
    </View>
  );
};

export default IndividualPhoto;
