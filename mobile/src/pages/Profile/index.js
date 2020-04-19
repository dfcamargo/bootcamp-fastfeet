import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import {
  Container,
  Avatar,
  Form,
  Label,
  FormText,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const dateFormatted = useMemo(
    () => format(parseISO(profile.created_at), 'dd/MM/yyyy'),
    [profile.created_at]
  );

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri: profile.avatar
            ? `${api.defaults.baseURL}/files/${profile.avatar.path}`
            : `https://api.adorable.io/avatars/140/${profile.name}.png`,
        }}
      />

      <Form>
        <Label>Nome completo</Label>
        <FormText>{profile.name}</FormText>

        <Label>Email</Label>
        <FormText>{profile.email}</FormText>

        <Label>Data de cadastro</Label>
        <FormText>{dateFormatted}</FormText>

        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Form>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
