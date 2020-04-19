import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FormWrapper, FormGroup } from '~/components/Form';
import Input from '~/components/Form/Input';

import history from '~/services/history';
import api from '~/services/api';

export default function UpdateRecipient({ location: { state: recipient } }) {
  const formRef = useRef(null);

  function handleBack() {
    /** volta para página anterior */
    history.goBack();
  }

  async function handleSubmit(data) {
    try {
      /** validação dos campos do formulário */
      const schema = Yup.object().shape({
        name: Yup.string().required('O campo nome é obrigatório'),
        address: Yup.string().required('O campo número é obrigatório'),
        address_number: Yup.string().required('O campo número é obrigatório'),
        address_note: Yup.string(),
        city: Yup.string().required('O campo cidade é obrigatório'),
        state: Yup.string().required('O campo estado é obrigatório'),
        zipcode: Yup.string().required('O campo CEP é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /** submete os dados */
      const {
        name,
        address,
        address_number,
        address_note,
        city,
        state,
        zipcode,
      } = data;

      await api.put(`recipients/${recipient.id}`, {
        name,
        address,
        address_number,
        address_note,
        city,
        state,
        zipcode,
      });

      /** mensagem de sucesso */
      toast.success('Destinatário atualizado com sucesso!');

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

  return (
    <>
      <header>
        <nav>
          <div>
            <h1>Edição de destinatário</h1>
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
          initialData={recipient}
          id="form"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">
            Nome
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Ludwig van Beethoven"
            />
          </label>

          <FormGroup gridTemplateColumns="3fr 1fr 1fr" gridGap="16px">
            <label htmlFor="address">
              Rua
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="Rua Beethoven"
              />
            </label>
            <label htmlFor="address_number">
              Número
              <Input
                type="text"
                id="address_number"
                name="address_number"
                placeholder="1729"
              />
            </label>
            <label htmlFor="address_note">
              Complemento
              <Input type="text" id="address_note" name="address_note" />
            </label>
          </FormGroup>

          <FormGroup gridTemplateColumns="1fr 1fr 1fr" gridGap="16px">
            <label htmlFor="city">
              Cidade
              <Input type="text" id="city" name="city" placeholder="Diadema" />
            </label>
            <label htmlFor="state">
              Estado
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="São Paulo"
              />
            </label>
            <label htmlFor="zipcode">
              CEP
              <Input
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="09960-580"
              />
            </label>
          </FormGroup>
        </Form>
      </FormWrapper>
    </>
  );
}

UpdateRecipient.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
