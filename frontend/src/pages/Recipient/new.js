import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { FormWrapper, FormGroup } from '~/pages/_layouts/default/styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo nome é obrigatório'),
  address: Yup.string(),
  address_number: Yup.number(),
  address_note: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipcode: Yup.number(),
});

export default function NewRecipient() {
  function handleBack() {
    history.goBack();
  }

  async function handleSubmit({
    name,
    address,
    address_number,
    address_note,
    city,
    state,
    zipcode,
  }) {
    await api.post('recipients', {
      name,
      address,
      address_number,
      address_note,
      city,
      state,
      zipcode,
    });

    history.goBack();
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
        <Form id="form" schema={schema} onSubmit={handleSubmit}>
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
