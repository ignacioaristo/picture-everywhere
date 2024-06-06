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
  Text,
  Image,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import {getLocation} from '../../../components/services/getLocation';
import {styles} from './CameraFrame.styles';
import Switch from '../../../../assets/img/refresh.jpeg';

const CameraFrame: React.FC = () => {
  const [frontCamera, setFrontCamera] = React.useState(true);
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
  const device = useCameraDevice(frontCamera ? 'front' : 'back')!;

  const getCurrentLocation = async () => {
    let alt, long;

    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      alt = location.latitude;
      long = location.longitude;

      const responseLocation = await getLocation(alt, long);

      return `${responseLocation.results[0].address_components[3].long_name}, ${responseLocation.results[0].address_components[5].long_name}, ${responseLocation.results[0].address_components[6].long_name}`;
    } catch (e: any) {
      console.log('Error: ', e);
    }
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
    <SafeAreaView style={styles.container}>
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
        <View style={styles.photoButton} />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setFrontCamera(!frontCamera)}>
        <Image source={Switch} style={styles.changeCamera} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default CameraFrame;
