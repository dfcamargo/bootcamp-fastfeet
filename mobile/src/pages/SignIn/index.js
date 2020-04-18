import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Background, Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [id, setId] = useState(null);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} tintColor="#fff" />

        <Form>
          <FormInput
            keyboardType="number-pad"
            icon="person-outline"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
