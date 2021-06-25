import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';

import { styles } from './styles';
import { Load } from '../../components/Load';
import { ListEmpty } from '../../components/ListEmpty';
import { ModalView } from '../../components/ModalView';
import { SignOut } from '../SignOut';
import { useAuth } from '../../hooks/auth';

// #unidade
export function Home() {
  const [category, setCategory] = useState('');
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    category === categoryId ? setCategory('') : setCategory(categoryId);
  }
  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }
  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected });
  }

  function handlerCloseSignOutModal() {
    setSignOutModalVisible(false);
  }

  function handlerOpenSignOutModal() {
    setSignOutModalVisible(true);
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );
  return (
    <Background>
      <View style={styles.header}>
        <Profile openModal={handlerOpenSignOutModal} />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 69 }}
            ItemSeparatorComponent={() => <ListDivider />}
            ListEmptyComponent={() => (
              <ListEmpty title="Não tem partidas agendadas" />
            )}
          />
        </>
      )}

      <SignOut
        handleCloseModal={handlerCloseSignOutModal}
        visible={signOutModalVisible}
      />
    </Background>
  );
}
