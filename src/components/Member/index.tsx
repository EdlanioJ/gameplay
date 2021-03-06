import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../global/styles/theme';
import { Avatar } from '../Avatar';

import { styles } from './styles';
export interface MemberProps {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}
type Props = {
  data: MemberProps;
};
export const Member: React.FC<Props> = ({ data }) => {
  const isOnline = data.status === 'online';
  const { on, primary } = theme.colors;
  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View>
        <Text style={styles.title}>{data.username}</Text>
        <View style={styles.status}>
          <View
            style={[
              styles.bulletStatus,
              { backgroundColor: isOnline ? primary : on },
            ]}
          />
          <Text style={styles.nameStatus}>
            {isOnline ? 'Disponível' : 'Ocupado'}
          </Text>
        </View>
      </View>
    </View>
  );
};
