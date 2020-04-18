import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Title,
  ProblemList,
  ProblemItem,
  Text,
  Date,
} from './styles';

export default function Problem({ navigation: { getParam } }) {
  const [problems, setProblems] = useState([]);

  const id = getParam('id');

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`deliveries/${id}/problems`);

      setProblems(response.data);
    }

    loadProblems();
  }, []);

  return (
    <Background>
      <Container>
        <Title>{`Encomenda #${id}`}</Title>
        <ProblemList
          data={problems}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <ProblemItem>
              <Text>{item.description}</Text>
              <Date>{item.createdAt}</Date>
            </ProblemItem>
          )}
        />
      </Container>
    </Background>
  );
}

Problem.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Visualizar problemas',
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

Problem.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
