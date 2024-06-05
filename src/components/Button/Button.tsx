import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {MainUseNavigationProps} from '../../screens/MainNavigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';

const Button: React.FC = () => {
  const navigation = useNavigation<MainUseNavigationProps>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CameraFrame')}
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
