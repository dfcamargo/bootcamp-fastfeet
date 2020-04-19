import React, { useRef } from 'react';
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

export default function UpdateDeliveryman({
  location: { state: deliveryman },
}) {
  const formRef = useRef(null);

  /** volta para página anterior */
  function handleBack() {
    history.goBack();
  }

  /** envia alterações para o servidor */
  async function handleSubmit(data) {
    try {
      /** validação dos campos do formulário */
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido')
          .required('O campo e-mail é obrigatório'),
        name: Yup.string().required('O campo nome é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      /** submete os dados */
      const { name, email, avatar_id } = data;

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
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <AvatarInput name="avatar_id" />

          <label htmlFor="name">
            Nome
            <Input type="text" id="name" name="name" />
          </label>

          <label htmlFor="email">
            Email
            <Input type="text" id="email" name="email" />
          </label>
        </Form>
      </FormWrapper>
    </>
  );
}

UpdateDeliveryman.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
