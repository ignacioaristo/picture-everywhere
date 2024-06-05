import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainUseNavigationProps} from '../MainNavigator';
import Button from '../../../components/Button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockArrayOfPhotosWithLocation} from './mock';

type PhotoData = {
  id: number;
  location: string;
  photo: ImageSourcePropType;
};

const LandingPage: React.FC = () => {
  const [photos, setPhotos] = React.useState<PhotoData[]>(
    mockArrayOfPhotosWithLocation,
  );
  const navigation = useNavigation<MainUseNavigationProps>();

  const handleOnPress = () => {
    navigation.navigate('IndividualPhoto');
  };

  const renderItem = ({item}: {item: PhotoData}) => {
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <Image style={{width: 100, height: 100}} source={item.photo} />
        <Text>{item.location}</Text>
      </TouchableOpacity>
    );
  };

  console.log('photosssss', photos);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: '100%',
      }}>
      <FlatList
        data={photos}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          height: 500,
        }}
        renderItem={renderItem}
      />
      <Button setPhotos={setPhotos} />
    </SafeAreaView>
  );
};

export default LandingPage;
