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
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: '80%',
          marginTop: 40,
        }}
        source={{uri: route.params.photo}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Picture location: {route.params.location}</Text>
      </View>
    </View>
  );
};

export default IndividualPhoto;
