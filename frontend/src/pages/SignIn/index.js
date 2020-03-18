import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo e-mail é obrigatório'),
  password: Yup.string().required('O campo senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">
          Seu e-mail
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@email.com"
          />
        </label>

        <label htmlFor="password">
          Sua Senha
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="digite sua senha"
          />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}
