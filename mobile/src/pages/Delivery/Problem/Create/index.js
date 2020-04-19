import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function CreateProblem({ navigation: { getParam, goBack } }) {
  const [description, setDescription] = useState('');

  const id = getParam('id');

  async function handleSubmit() {
    try {
      await api.post(`deliveries/${id}/problems`, { description });

      goBack();
    } catch (error) {
      Alert.alert('Erro', error.response.data.message);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            multiline
            numberOfLines={10}
            maxLength={200}
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            value={description}
            onChangeText={setDescription}
          />

          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

CreateProblem.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Informar problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

CreateProblem.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
