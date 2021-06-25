import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

export const TextArea: React.FC<TextInputProps> = ({ ...rest }) => {
  return <TextInput style={styles.container} {...rest} />;
};
