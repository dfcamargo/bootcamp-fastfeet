import React, { useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Delivery,
  DeliveryInfo,
  Header,
  Title,
  Info,
  Label,
  Text,
  Status,
  Date,
  DateItem,
  Footer,
  ActionButton,
  ButtonText,
} from './styles';

export default function Detail({ navigation: { getParam, navigate, goBack } }) {
  const delivery = getParam('delivery');

  const startDateFormatted = useMemo(
    () =>
      delivery.start_date
        ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
        : '-',
    [delivery.start_date]
  );

  const endDateFormatted = useMemo(
    () =>
      delivery.end_date
        ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
        : '-',
    [delivery.end_date]
  );

  async function handlePickup(id) {
    try {
      await api.put(`deliveries/${id}/pickup`);

      goBack();
    } catch (err) {
      Alert.alert('Error', err.response.data.message);
    }
  }

  function handleDelivered(id) {
    navigate('Confirm', { id });
  }

  function handleCreateProblem(id) {
    navigate('CreateProblem', { id });
  }

  function handleListProblem(id) {
    navigate('Problem', { id });
  }

  return (
    <Background>
      <Container>
        <Delivery>
          <DeliveryInfo>
            <Header>
              <Icon name="local-shipping" size={25} color="#7d40e7" />
              <Title>Informações de entrega</Title>
            </Header>

            <Info>
              <Label>Destinatário</Label>
              <Text>{delivery.recipient.name}</Text>

              <Label>Endereço de entrega</Label>
              <Text>{delivery.recipient.full_address}</Text>

              <Label>Produto</Label>
              <Text>{delivery.product}</Text>
            </Info>
          </DeliveryInfo>

          <DeliveryInfo>
            <Header>
              <Icon name="event" size={25} color="#7d40e7" />
              <Title>Situação da entrega</Title>
            </Header>

            <Status>
              <Label>STATUS</Label>
              <Text>{delivery.status}</Text>

              <Date>
                <DateItem>
                  <Label>Data de retirada</Label>
                  <Text>{startDateFormatted}</Text>
                </DateItem>

                <DateItem>
                  <Label>Data de entrega</Label>
                  <Text>{endDateFormatted}</Text>
                </DateItem>
              </Date>
            </Status>
          </DeliveryInfo>

          <Footer>
            <ActionButton onPress={() => handleCreateProblem(delivery.id)}>
              <Icon name="highlight-off" size={25} color="#e74040" />
              <ButtonText>Informar Problema</ButtonText>
            </ActionButton>

            <ActionButton onPress={() => handleListProblem(delivery.id)}>
              <Icon name="info-outline" size={25} color="#e7ba40" />
              <ButtonText>Visualizar Problema</ButtonText>
            </ActionButton>

            {delivery.start_date ? (
              <ActionButton onPress={() => handleDelivered(delivery.id)}>
                <Icon name="done-all" size={25} color="#7d40e7" />
                <ButtonText>Confirmar Entrega</ButtonText>
              </ActionButton>
            ) : (
              <ActionButton onPress={() => handlePickup(delivery.id)}>
                <Icon name="done" size={20} color="#7d40e7" />
                <ButtonText>Confirmar Retirada</ButtonText>
              </ActionButton>
            )}
          </Footer>
        </Delivery>
      </Container>
    </Background>
  );
}

Detail.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Detalhes da encomenda',
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

Detail.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
