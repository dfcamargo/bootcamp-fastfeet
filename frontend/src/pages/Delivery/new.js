import React from 'react';
import * as Yup from 'yup';
// import AsyncSelect from 'react-select/async';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import AsyncSelect from './SelectInput';

import history from '~/services/history';
import api from '~/services/api';

import { FormWrapper, FormGroup } from '~/pages/_layouts/default/styles';

const schema = Yup.object().shape({
  recipient: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required(),
  deliveryman: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required(),
  product: Yup.string().required('O campo produto é obrigatório'),
});

export default function NewDeliveryman() {
  function handleBack() {
    history.goBack();
  }

  async function handleSubmit({ recipient, deliveryman, product }) {
    await api.post('deliveries', {
      recipient_id: recipient.value,
      deliveryman_id: deliveryman.value,
      product,
    });
    history.goBack();
  }

  async function getRecipients(inputValue) {
    const request = await api.get('recipients', { params: { q: inputValue } });
    return request.data.map(recipient => {
      return {
        value: recipient.id,
        label: recipient.name,
      };
    });
  }

  async function getDeliverymen(inputValue) {
    const request = await api.get('deliverymen', { params: { q: inputValue } });
    return request.data.map(deliveryman => {
      return {
        value: deliveryman.id,
        label: deliveryman.name,
      };
    });
  }

  return (
    <>
      <header>
        <nav>
          <div>
            <h1>Cadastro de encomendas</h1>
          </div>
          <aside>
            <button type="button" onClick={handleBack}>
              <MdChevronLeft size={18} />
              Voltar
            </button>
            <button type="submit" form="deliveryForm">
              <MdCheck size={18} />
              Salvar
            </button>
          </aside>
        </nav>
      </header>

      <FormWrapper>
        <Form id="deliveryForm" schema={schema} onSubmit={handleSubmit}>
          <FormGroup gridTemplateColumns="1fr 1fr" gridGap="16px">
            <label htmlFor="recipient">
              Destinatário
              <AsyncSelect
                id="recipient"
                name="recipient"
                cacheOptions
                defaultOptions
                loadOptions={getRecipients}
              />
            </label>
            <label htmlFor="deliveryman">
              Entregador
              <AsyncSelect
                id="deliveryman"
                name="deliveryman"
                cacheOptions
                defaultOptions
                loadOptions={getDeliverymen}
              />
            </label>
          </FormGroup>
          <label htmlFor="product">
            Nome do produto
            <Input
              type="text"
              id="product"
              name="product"
              placeholder="Yamaha SX7"
            />
          </label>
        </Form>
      </FormWrapper>
    </>
  );
}
