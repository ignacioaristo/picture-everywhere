import React, {useEffect, useRef} from 'react';
import {MainNavigatorStackList, MainUseNavigationProps} from '../MainNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useLocationPermission,
} from 'react-native-vision-camera';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import {getLocation} from '../../../components/services/getLocation';
import {styles} from './CameraFrame.styles';
import {RefreshCircle, ArrowLeft} from 'iconoir-react-native';

const CameraFrame: React.FC = () => {
  const [frontCamera, setFrontCamera] = React.useState(true);
  const navigation = useNavigation<MainUseNavigationProps>();
  const route = useRoute<RouteProp<MainNavigatorStackList, 'CameraFrame'>>();
  const photos = route.params.photos;

  const camRef = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useLocationPermission();

  useEffect(() => {
    !hasPermission && requestPermission();
  }, []);

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
      navigation.navigate('IndividualPhoto', {
        location: currentLocation!,
        photo: data.path,
      });
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
      <TouchableOpacity
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        style={styles.backArrow}
        onPress={() => navigation.goBack()}>
        <ArrowLeft color="white" height={36} width={36} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressHandler} style={styles.photoButton}>
          <View />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFrontCamera(!frontCamera)}
          style={styles.changeCamera}>
          <RefreshCircle color="white" height={36} width={36} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CameraFrame;
