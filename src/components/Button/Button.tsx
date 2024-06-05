import React from 'react';
import {TouchableOpacity} from 'react-native';

const Button = () => {
  return <TouchableOpacity onPress={() => console.log('Abre camara')} />;
};

export default Button;
