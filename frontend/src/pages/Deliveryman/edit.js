import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import AvatarInput from './AvatarInput';

import history from '~/services/history';

import { FormWrapper } from '~/pages/_layouts/default/styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo e-mail é obrigatório'),
  name: Yup.string().required('O campo nome é obrigatório'),
});

export default function EditDeliveryman() {
  function handleBack() {
    history.goBack();
  }

  function handleSubmit({ id }) {}

  return (
    <>
      <header>
        <nav>
          <div>
            <h1>Edição de entregadores</h1>
          </div>
          <aside>
            <button type="button" onClick={handleBack}>
              <MdChevronLeft size={18} />
              Voltar
            </button>
            <button type="submit" form="formDeliveryman">
              <MdCheck size={18} />
              Salvar
            </button>
          </aside>
        </nav>
      </header>

      <FormWrapper>
        <Form id="formDeliveryman" schema={schema} onSubmit={handleSubmit}>
          <AvatarInput />

          <label htmlFor="name">
            Nome
            <Input type="text" id="name" name="name" placeholder="John Due" />
          </label>

          <label htmlFor="email">
            Email
            <Input
              type="text"
              id="email"
              name="email"
              placeholder="example@rocketseat.com"
            />
          </label>
        </Form>
      </FormWrapper>
    </>
  );
}
