import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {MainUseNavigationProps} from '../../screens/MainNavigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';

type Props = {
  setPhotos: any;
  photos: any;
};

const Button: React.FC<Props> = ({setPhotos, photos}) => {
  const navigation = useNavigation<MainUseNavigationProps>();
  const handleNavigation = () => {
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
