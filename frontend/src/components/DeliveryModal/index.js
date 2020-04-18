import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { Content } from '~/pages/_layouts/modal/styles';

export default function DeliveryModal({ delivery }) {
  /** formata data de retirada */
  const startDateFormatted = useMemo(
    () =>
      delivery.start_date &&
      format(parseISO(delivery.start_date), 'dd/MM/yyyy'),
    [delivery.start_date]
  );

  /** formata data de entrega */
  const endDateFormatted = useMemo(
    () =>
      delivery.end_date && format(parseISO(delivery.end_date), 'dd/MM/yyyy'),
    [delivery.end_date]
  );

  return (
    <>
      <Content>
        <h2>Informações da encomenda</h2>
        <p>{`${delivery.recipient.address}, ${delivery.recipient.address_number}`}</p>
        <p>{`${delivery.recipient.city} - ${delivery.recipient.state}`}</p>
        <p>{delivery.recipient.zipcode}</p>
      </Content>

      <Content>
        <h2>Datas</h2>
        <p>
          <strong>Retirada:</strong>
          {startDateFormatted || '-- / -- / --'}
        </p>
        <p>
          <strong>Entrega:</strong>
          {endDateFormatted || '-- / -- / --'}
        </p>
      </Content>

      <Content>
        <h2>Assinatura do destinatário</h2>
        {delivery.signature && (
          <img src={delivery.signature.url} alt={delivery.recipient.name} />
        )}
      </Content>
    </>
  );
}

DeliveryModal.propTypes = {
  delivery: PropTypes.instanceOf(Object).isRequired,
};
