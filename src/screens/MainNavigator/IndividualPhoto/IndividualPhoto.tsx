import React from 'react';
import {Image, Share, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavigatorStackList} from '../MainNavigator';
import {styles} from './IndividualPhoto.styles';
import {ShareIos} from 'iconoir-react-native';
import {useLocationPermission} from 'react-native-vision-camera';

const IndividualPhoto: React.FC = () => {
  const route =
    useRoute<RouteProp<MainNavigatorStackList, 'IndividualPhoto'>>();
  const {hasPermission} = useLocationPermission();

  const handleOnShare = async () => {
    try {
      await Share.share({url: route.params.photo});
    } catch (error: any) {
      console.error('Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: route.params.photo}} />
      <View style={styles.location}>
        {hasPermission ? (
          <Text>Picture location: {route.params.location}</Text>
        ) : (
          <Text>No location given</Text>
        )}
      </View>
      <TouchableOpacity style={styles.share} onPress={handleOnShare}>
        <ShareIos height={36} width={36} />
      </TouchableOpacity>
    </View>
  );
};

export default IndividualPhoto;
