import React, {useRef} from 'react';
import {MainUseNavigationProps} from '../../screens/MainNavigator/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {TouchableWithoutFeedback, View} from 'react-native';

const CameraFrame = () => {
  const device = useCameraDevice('front');
  const {hasPermission} = useCameraPermission();
  console.log('hasPermission', hasPermission);
  const navigation = useNavigation<MainUseNavigationProps>();

  // if (!hasPermission) {
  //   return <PermissionsPage />;
  // }
  if (device == null) {
    return navigation.navigate('LandingPage');
  }

  const camRef = useRef(null);

  const onPressHandler = async () => {
    try {
      if (camRef.current == null) {
        throw new Error('Camera ref is null');
      }

      const data = await camRef.current?.takePhoto({
        qualityPrioritization: 'quality',
        enableAutoRedEyeReduction: true,
        flash: 'auto',
      });

      console.log('data', data);
    } catch (err: any) {
      // Sentry.captureException(err);
      console.log('Error: ', err);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Camera ref={camRef} device={device} isActive={true} photo={true} />

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
    </View>
  );
};

export default CameraFrame;
