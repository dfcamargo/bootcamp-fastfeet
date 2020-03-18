import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function Header() {
  const { name } = useSelector(state => state.user.profile);
  const disptach = useDispatch();

  function handleSignOut() {
    disptach(signOut());
  }

  return (
    <Container>
      <img src={logo} alt="FastFeet" />
      <ul>
        <li>
          <Link to="/deliveries">Encomendas</Link>
        </li>
        <li>
          <Link to="/deliverymen">Entregadores</Link>
        </li>
        <li>
          <Link to="/recipients">Destinatários</Link>
        </li>
        <li>
          <Link to="/problems">Problemas</Link>
        </li>
        <li>
          {name}
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </li>
      </ul>
    </Container>
  );
}
