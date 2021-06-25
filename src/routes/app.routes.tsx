import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';
import { theme } from '../global/styles/theme';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { AppointmentDetails } from '../screens/AppointmentDetails';

const { Navigator, Screen } = createStackNavigator();

export function AppRoute() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: theme.colors.secondary100 },
      }}
    >
      <Screen component={Home} name="Home" />
      <Screen component={AppointmentCreate} name="AppointmentCreate" />
      <Screen component={AppointmentDetails} name="AppointmentDetails" />
    </Navigator>
  );
}
