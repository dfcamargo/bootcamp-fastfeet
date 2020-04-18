import React from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormWrapper } from '~/components/Form';
import AvatarInput from '~/components/Form/AvatarInput';
import Input from '~/components/Form/Input';

import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo e-mail é obrigatório'),
  name: Yup.string().required('O campo nome é obrigatório'),
});

export default function CreateDeliveryman() {
  function handleBack() {
    /** volta para página anterior */
    history.goBack();
  }

  async function handleSubmit({ name, email, avatar_id }) {
    try {
      /** submete os dados */
      await api.post('deliverymen', { name, email, avatar_id });

      /** mensagem de sucesso */
      toast.success('Entregador cadastrado com sucesso!');

      /** volta para página anterior */
      history.goBack();
    } catch (err) {
      /** mensagem de erro */
      toast.error(`Ops! Ocorreu um problema. ${err}`);
    }
  }

  return (
    <>
      <header>
        <nav>
          <div>
            <h1>Cadastro de entregadores</h1>
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
          <AvatarInput name="avatar_id" />

          <label htmlFor="name">
            Nome
            <Input type="text" id="name" name="name" placeholder="John Due" />
          </label>

          <label htmlFor="email">
            Email
            <Input
              type="email"
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
