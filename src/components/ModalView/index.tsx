import React from 'react';
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import { Background } from '../Background';

import { styles } from './styles';

const { height } = Dimensions.get('screen');
type Props = ModalProps & {
  closeModal: () => void;
};
export const ModalView: React.FC<Props> = ({
  children,
  closeModal,
  ...rest
}) => {
  return (
    <Modal transparent statusBarTranslucent animationType="slide" {...rest}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Background>
              <View style={styles.bar} />
              {children}
            </Background>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
