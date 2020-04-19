import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import { FormWrapper } from '~/components/Form';
import AvatarInput from '~/components/Form/AvatarInput';
import Input from '~/components/Form/Input';

import history from '~/services/history';
import api from '~/services/api';

export default function CreateDeliveryman() {
  const formRef = useRef(null);

  function handleBack() {
    /** volta para página anterior */
    history.goBack();
  }

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

      await api.post('deliverymen', { name, email, avatar_id });

      /** mensagem de sucesso */
      toast.success('Entregador cadastrado com sucesso!');

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
        <Form id="form" ref={formRef} onSubmit={handleSubmit}>
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
