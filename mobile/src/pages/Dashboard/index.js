import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import Order from '~/components/Order';

import api from '~/services/api';

import {
  Container,
  Profile,
  Avatar,
  Info,
  Welcome,
  Name,
  LogoutButton,
  Delivery,
  Header,
  LinkButton,
  LinkButtonText,
  Title,
  DeliveryList,
  EmptyItem,
  EmptyText,
} from './styles';

function Dashboard({ isFocused, navigation: { navigate } }) {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [deliveries, setDeliveries] = useState([]);
  const [delivered, setDelivered] = useState(null);

  async function loadDeliveries() {
    const response = await api.get(`deliverymen/${profile.id}/deliveries`, {
      params: {
        delivered,
      },
    });

    setDeliveries(response.data);
  }

  useEffect(() => {
    /** carrega as encomendas do entregador autenticado */
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused, delivered]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handleItemDetail(item) {
    navigate('Detail', { delivery: item });
  }

  return (
    <Container>
      <Profile>
        <Avatar
          source={{
            uri: profile.avatar
              ? `${api.defaults.baseURL}/files/${profile.avatar.path}`
              : `https://api.adorable.io/avatars/140/${profile.name}.png`,
          }}
        />

        <Info>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>{profile.name}</Name>
        </Info>

        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" size={30} color="#e74040" />
        </LogoutButton>
      </Profile>

      <Delivery>
        <Header>
          <Title>Entregas</Title>
          <LinkButton onPress={() => setDelivered(null)}>
            <LinkButtonText selected={!delivered}>Pendentes</LinkButtonText>
          </LinkButton>
          <LinkButton onPress={() => setDelivered(true)}>
            <LinkButtonText selected={delivered}>Entregues</LinkButtonText>
          </LinkButton>
        </Header>

        {deliveries.length ? (
          <DeliveryList
            data={deliveries}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Order data={item} onItemDetail={handleItemDetail} />
            )}
          />
        ) : (
          <EmptyItem>
            <EmptyText>Nenhuma encomenda encontrada</EmptyText>
          </EmptyItem>
        )}
      </Delivery>
    </Container>
  );
}

Dashboard.navigationOptions = {
  headerShown: false,
};

Dashboard.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
