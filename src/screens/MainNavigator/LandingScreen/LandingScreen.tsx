import React from 'react';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MainUseNavigationProps} from '../MainNavigator';
import Button from '../../../components/Button/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

export type PhotoData = {
  location: string;
  photo: string;
};

const LandingPage: React.FC = () => {
  const [photos, setPhotos] = React.useState<PhotoData[]>();
  const navigation = useNavigation<MainUseNavigationProps>();

  const handleOnPress = (item: PhotoData) => {
    navigation.navigate('IndividualPhoto', {
      photo: item.photo,
      location: item.location,
    });
  };

  const renderItem = ({item}: {item: PhotoData}) => {
    return (
      <TouchableOpacity onPress={() => handleOnPress(item)}>
        <Image style={{width: 100, height: 100}} source={{uri: item.photo}} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: '100%',
      }}>
      {photos ? (
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
      ) : null}

      <Button setPhotos={setPhotos} photos={photos} />
    </SafeAreaView>
  );
};

export default LandingPage;
