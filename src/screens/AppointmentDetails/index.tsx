import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  FlatList,
  Alert,
  Platform,
  Share,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Member, MemberProps } from '../../components/Member';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';

import DiscordImg from '../../assets/discord.png';
import BannerImg from '../../assets/banner.png';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { api } from '../../services/api';
import { Load } from '../../components/Load';
import { ListEmpty } from '../../components/ListEmpty';

type Params = {
  guildSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
};

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${guildSelected.guild.id}/widget.json`
      );
      setWidget(response.data);
    } catch {
      Alert.alert(
        'Verifique as configurações do servidor. Será que o Widget está habilitado?'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message =
      Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detathes"
        action={
          guildSelected.guild.owner && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto name="share" color={theme.colors.primary} size={24} />
            </BorderlessButton>
          )
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${
              widget.members.length ? widget.members.length : 0
            }`}
          />
          <FlatList
            style={styles.members}
            data={widget.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Member data={item} />}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            ListEmptyComponent={() => (
              <ListEmpty title="Guild não tem membros" />
            )}
          />
        </>
      )}
      {guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon
            onPress={handleOpenGuild}
            title="Entrar na partida"
            icon={DiscordImg}
          />
        </View>
      )}
    </Background>
  );
}
