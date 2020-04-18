import React from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';
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

export default function UpdateDeliveryman({
  location: { state: deliveryman },
}) {
  /** volta para página anterior */
  function handleBack() {
    history.goBack();
  }

  /** envia alterações para o servidor */
  async function handleSubmit({ name, email, avatar_id }) {
    try {
      /** submete as alterações */
      await api.put(`deliverymen/${deliveryman.id}`, {
        name,
        email,
        avatar_id,
      });

      /** mensagem de sucesso */
      toast.success('Entregador atualizado com sucesso!');

      /** volta para página anterior */
      history.goBack();
    } catch (err) {
      /** mensagem de erro */
      toast.warn(`Ops! Ocorreu um problema. ${err}`);
    }
  }

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
            <button type="submit" form="form">
              <MdCheck size={18} />
              Salvar
            </button>
          </aside>
        </nav>
      </header>

      <FormWrapper>
        <Form
          initialData={deliveryman}
          id="form"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <AvatarInput name="avatar_id" />

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

UpdateDeliveryman.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
