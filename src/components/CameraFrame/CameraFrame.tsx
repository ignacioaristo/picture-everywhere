import React, {useRef} from 'react';
import {MainUseNavigationProps} from '../../screens/MainNavigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const CameraFrame = () => {
  const device = useCameraDevice('front');
  const {hasPermission} = useCameraPermission();
  const navigation = useNavigation<MainUseNavigationProps>();

  const camRef = useRef<Camera>(null);

  if (device == null || !hasPermission) {
    return navigation.navigate('LandingPage');
  }

  const onPressHandler = async () => {
    try {
      if (camRef.current == null) {
        throw new Error('Camera ref is null');
      }

      const data = await camRef.current?.takePhoto({
        enableAutoRedEyeReduction: true,
        flash: 'on',
      });

      console.log('data', data);
    } catch (err: any) {
      console.log('Error: ', err);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Camera
        ref={camRef}
        video={true}
        device={device}
        isActive={true}
        photo={true}
        style={StyleSheet.absoluteFill}
      />

      <TouchableWithoutFeedback onPress={onPressHandler}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 72 / 2,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 92,
          }}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CameraFrame;
