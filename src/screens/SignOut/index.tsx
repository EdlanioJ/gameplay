import React from 'react';
import { View, Text, Modal, TouchableOpacity, ModalProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

type Props = ModalProps & {
  handleCloseModal: () => void;
};
export const SignOut: React.FC<Props> = ({ handleCloseModal, ...rest }) => {
  const { signOut, user } = useAuth();

  async function handleSignOut() {
    handleCloseModal();
    await signOut();
  }
  return (
    <Modal transparent statusBarTranslucent animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Background>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: theme.fonts.title500,
                      marginRight: 5,
                      color: theme.colors.heading,
                    },
                  ]}
                >
                  Deseja sair do
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: theme.fonts.title700,
                      color: theme.colors.heading,
                    },
                  ]}
                >
                  Game
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: theme.fonts.title700,
                      color: theme.colors.primary,
                    },
                  ]}
                >
                  Play
                </Text>
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: theme.fonts.title700,
                      color: theme.colors.heading,
                    },
                  ]}
                >
                  ?
                </Text>
              </View>

              <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleCloseModal}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Não</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleSignOut}
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <Text style={styles.buttonText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Background>
        </View>
      </View>
    </Modal>
  );
};
