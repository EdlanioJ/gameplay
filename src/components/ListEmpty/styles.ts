import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.heading,
  },
});
