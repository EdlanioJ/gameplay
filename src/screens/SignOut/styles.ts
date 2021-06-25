import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/styles/theme';

const { height, width } = Dimensions.get('screen');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
  },
  content: {
    zIndex: 10,
    alignItems: 'center',
  },
  header: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 23,
    justifyContent: 'space-between',
  },
  button: {
    width: width * 0.4,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.secondary30,
  },
  buttonText: {
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    color: theme.colors.heading,
  },
});
