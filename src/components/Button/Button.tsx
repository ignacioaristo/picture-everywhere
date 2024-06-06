import React from 'react';
import {TouchableOpacity, Text, Modal, Alert, Linking} from 'react-native';
import {MainUseNavigationProps} from '../../screens/MainNavigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-vision-camera';

type Props = {
  setPhotos: any;
  photos: any;
};

const Button: React.FC<Props> = ({setPhotos, photos}) => {
  const navigation = useNavigation<MainUseNavigationProps>();

  const handleNavigation = async () => {
    const status = Camera.getCameraPermissionStatus();

    if (status === 'denied') {
      return Alert.alert(
        'No camera permission',
        'Please go to config and enable it',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Go to Config',
            onPress: async () => await Linking.openSettings(),
          },
        ],
      );
    }

    return navigation.navigate('CameraFrame', {
      callback: setPhotos,
      photos,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={{
        alignItems: 'center',
        marginBottom: 50,
        width: 'auto',
      }}>
      <Text
        style={{
          borderWidth: 3,
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
        Take Picture
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
