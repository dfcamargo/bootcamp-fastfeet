import React, { useRef } from 'react';
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

export default function UpdateDelivery({ location: { state: delivery } }) {
  const formRef = useRef(null);

  function handleBack() {
    /** volta para página anterior */
    history.goBack();
  }

  async function handleSubmit(data) {
    try {
      /** validação dos campos do formulário */
      const schema = Yup.object().shape({
        recipient: Yup.string().required('O campo destinatário é obrigatório'),
        deliveryman: Yup.string().required('O campo entregador é obrigatório'),
        product: Yup.string().required('O campo produto é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /** submete os dados */
      const { recipient, deliveryman, product } = data;

      await api.put(`deliveries/${delivery.id}`, {
        recipient_id: recipient,
        deliveryman_id: deliveryman,
        product,
      });

      /** mensagem de sucesso */
      toast.success('Encomenda atualizada com sucesso!');

      /** volta para página anterior */
      history.goBack();
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        /** mensagem de erro */
        toast.error(`Ops! Ocorreu um problema. ${err}`);
      }
    }
  }

  /** consulta todos os destinatários */
  async function getRecipients(inputValue) {
    const request = await api.get('recipients', { params: { q: inputValue } });
    return request.data.recipients.map(recipient => {
      return {
        value: recipient.id,
        label: recipient.name,
      };
    });
  }

  /** consulta todos os entregadores */
  async function getDeliverymen(inputValue) {
    const request = await api.get('deliverymen', { params: { q: inputValue } });
    return request.data.deliverymen.map(deliveryman => {
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
          ref={formRef}
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
