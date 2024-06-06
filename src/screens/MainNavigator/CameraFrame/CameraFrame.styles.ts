import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 80,
    left: 40,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 92,
    width: '100%',
  },
  photoButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    alignSelf: 'center',
    position: 'absolute',
  },
  changeCamera: {
    position: 'absolute',
    right: 80,
  },
});
