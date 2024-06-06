import React, {useEffect, useRef} from 'react';
import {MainNavigatorStackList} from '../MainNavigator';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import {getLocation} from '../../../components/services/getLocation';

const CameraFrame: React.FC = () => {
  const route = useRoute<RouteProp<MainNavigatorStackList, 'CameraFrame'>>();
  const photos = route.params.photos;

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

  const getCurrentLocation = async () => {
    let alt, long;

    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        alt = location.latitude;
        long = location.longitude;
      })
      .catch(error => {
        console.error(error);
      });

    const responseLocation = await getLocation(alt, long);

    return `${responseLocation.results[0].address_components[3].long_name}, ${responseLocation.results[0].address_components[5].long_name}, ${responseLocation.results[0].address_components[6].long_name}`;
  };

  const onPressHandler = async () => {
    try {
      if (camRef.current == null) {
        throw new Error('Camera ref is null');
      }

      const data = await camRef.current?.takePhoto({
        enableAutoRedEyeReduction: true,
        flash: 'auto',
      });

      const currentLocation = await getCurrentLocation();
      route.params.callback([
        ...(photos ?? []),
        {
          location: currentLocation,
          photo: data.path,
        },
      ]);
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
        enableLocation={true}
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
