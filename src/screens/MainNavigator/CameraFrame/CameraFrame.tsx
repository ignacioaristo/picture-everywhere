import React, {useEffect, useRef} from 'react';
import {MainNavigatorStackList, MainUseNavigationProps} from '../MainNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
  Linking,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const CameraFrame: React.FC = () => {
  const route = useRoute<RouteProp<MainNavigatorStackList, 'CameraFrame'>>();

  const camRef = useRef<Camera>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const permissions = await Camera.requestCameraPermission();
      if (permissions === 'denied') {
        await Linking.openSettings();
      }
    };
    getCameraPermissions();
  });
  const device = useCameraDevice('front')!;

  const onPressHandler = async () => {
    try {
      if (camRef.current == null) {
        throw new Error('Camera ref is null');
      }

      const data = await camRef.current?.takePhoto({
        enableAutoRedEyeReduction: true,
        flash: 'on',
      });

      await CameraRoll.saveToCameraRoll(`file://${data.path}`, {
        type: 'photo',
      });

      const result = await fetch(`file://${data.path}`);
      const lafoto = await result.blob();

      console.log('la foto', lafoto);

      route.params.callback({photo: data.path});
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
        preview={true}
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
