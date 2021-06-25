import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  icon: ImageSourcePropType;
};

export const ButtonIcon: React.FC<Props> = ({ title, icon, ...rest }) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
};
