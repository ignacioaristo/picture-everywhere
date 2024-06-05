import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NYImage from '../../../../assets/img/NY.jpg';
import {useNavigation} from '@react-navigation/native';
import {MainUseNavigationProps} from '../MainNavigator';

type PhotoData = {
  id: number;
  location: string;
  photo: ImageSourcePropType;
};

const LandingPage: React.FC = () => {
  const navigation = useNavigation<MainUseNavigationProps>();
  const mockArrayOfPhotosWithLocation = [
    {
      id: 1,
      location: 'New York',
      photo: NYImage,
    },
    {
      id: 2,
      location: 'Paris',
      photo: NYImage,
    },
    {
      id: 3,
      location: 'London',
      photo: NYImage,
    },
    {
      id: 4,
      location: 'Tokyo',
      photo: NYImage,
    },
    {
      id: 5,
      location: 'Tokyo',
      photo: NYImage,
    },
  ];

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        height: '100%',
      }}>
      <FlatList
        data={mockArrayOfPhotosWithLocation}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          height: 500,
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LandingPage;
