import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    height: '100%',
  },
  noPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noPhotoText: {
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
    color: 'lightgrey',
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    height: '80%',
  },
  image: {
    width: 100,
    height: 100,
  },
});
