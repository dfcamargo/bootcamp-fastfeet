import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Progress from './Progress';

import {
  Container,
  Header,
  Title,
  Footer,
  Info,
  Label,
  Text,
  ActionLink,
  ActionLinkText,
} from './styles';

export default function Order({ data, onItemDetail }) {
  const dateFormatted = useMemo(
    () =>
      data.start_date ? format(parseISO(data.start_date), 'dd/MM/yyyy') : '-',
    [data.start_date]
  );

  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={25} color="#7d40e7" />
        <Title>{`Encomenda #${data.id}`}</Title>
      </Header>

      <Progress start={data.start_date} end={data.end_date} />

      <Footer>
        <Info>
          <Label>Data</Label>
          <Text>{dateFormatted}</Text>
        </Info>

        <Info>
          <Label>Cidade</Label>
          <Text>{data.recipient.city}</Text>
        </Info>

        <ActionLink onPress={() => onItemDetail(data)}>
          <ActionLinkText>Ver detalhes</ActionLinkText>
        </ActionLink>
      </Footer>
    </Container>
  );
}

Order.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onItemDetail: PropTypes.func.isRequired,
};
