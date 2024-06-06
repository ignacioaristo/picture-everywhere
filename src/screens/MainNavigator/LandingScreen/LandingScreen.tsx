import React, {useEffect} from 'react';
import {FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainUseNavigationProps} from '../MainNavigator';
import Button from '../../../components/Button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './LandingScreen.styles';
import {useLocationPermission} from 'react-native-vision-camera';

export type PhotoData = {
  location: string;
  photo: string;
};

const LandingPage: React.FC = () => {
  const [photos, setPhotos] = React.useState<PhotoData[]>();
  const navigation = useNavigation<MainUseNavigationProps>();

  const {hasPermission, requestPermission} = useLocationPermission();
  useEffect(() => {
    !hasPermission && requestPermission();
  }, []);

  const handleOnPress = (item: PhotoData) => {
    navigation.navigate('IndividualPhoto', {
      photo: item.photo,
      location: item.location,
    });
  };

  const renderItem = ({item}: {item: PhotoData}) => {
    return (
      <TouchableOpacity onPress={() => handleOnPress(item)}>
        <Image style={styles.image} source={{uri: item.photo}} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {photos ? (
        <FlatList
          data={photos}
          contentContainerStyle={styles.flatListContainer}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.noPhotoContainer}>
          <Text style={styles.noPhotoText}> No photos yet, start now! </Text>
        </View>
      )}
      <Button setPhotos={setPhotos} photos={photos} />
    </SafeAreaView>
  );
};

export default LandingPage;
