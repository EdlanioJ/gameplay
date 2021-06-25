import React from 'react';
import {
  Alert,
  View,
  ScrollView,
  Image,
  Text,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import IllustrationImg from '../../assets/illustration.png';
import DiscordImg from '../../assets/discord.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function SignIn() {
  const { signIn, loading } = useAuth();
  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }
  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        <View style={styles.container}>
          <Image
            source={IllustrationImg}
            style={styles.image}
            resizeMode="stretch"
          />

          <View style={styles.content}>
            <Text style={styles.title}>
              Conecte-se{`\n`}e organize suas{`\n`}
              jogatinas
            </Text>

            <Text style={styles.subtitle}>
              Crie grupos para jogar seus games {`\n`}
              favoritos com seus amigos
            </Text>

            {loading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <ButtonIcon
                onPress={handleSignIn}
                title="Entrar com Discord"
                icon={DiscordImg}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
