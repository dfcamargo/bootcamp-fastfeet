import React from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FormWrapper, FormGroup } from '~/components/Form';
import Input from '~/components/Form/Input';
import AsyncSelect from '~/components/Form/AsyncSelect';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  recipient: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('O campo destinatário é obrigatório'),
  deliveryman: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('O campo entregador é obrigatório'),
  product: Yup.string().required('O campo produto é obrigatório'),
});

export default function UpdateDelivery({ location: { state: delivery } }) {
  function handleBack() {
    /** volta para página anterior */
    history.goBack();
  }

  async function handleSubmit({ product, recipient, deliveryman }) {
    try {
      /** submete as alterações */
      await api.put(`deliveries/${delivery.id}`, {
        recipient_id: recipient.value,
        deliveryman_id: deliveryman.value,
        product,
      });

      /** mensagem de sucesso */
      toast.success('Encomenda atualizada com sucesso!');

      /** volta para página anterior */
      history.goBack();
    } catch (err) {
      /** mensagem de erro */
      toast.error(`Ops! Ocorreu um problema. ${err}`);
    }
  }

  /** consulta todos os destinatários */
  async function getRecipients(inputValue) {
    const request = await api.get('recipients', { params: { q: inputValue } });
    return request.data.map(recipient => {
      return {
        value: recipient.id,
        label: recipient.name,
      };
    });
  }

  /** consulta todos os entregadores */
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
            <h1>Edição de encomendas</h1>
          </div>
          <aside>
            <button type="button" onClick={handleBack}>
              <MdChevronLeft size={18} />
              Voltar
            </button>
            <button type="submit" form="form">
              <MdCheck size={18} />
              Salvar
            </button>
          </aside>
        </nav>
      </header>

      <FormWrapper>
        <Form
          initialData={delivery}
          id="form"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <FormGroup gridTemplateColumns="1fr 1fr" gridGap="16px">
            <label htmlFor="recipient">
              Destinatário
              <AsyncSelect
                id="recipient"
                name="recipient"
                defaultValue={{
                  value: delivery.recipient.id,
                  label: delivery.recipient.name,
                }}
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
                defaultValue={{
                  value: delivery.deliveryman.id,
                  label: delivery.deliveryman.name,
                }}
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

UpdateDelivery.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
