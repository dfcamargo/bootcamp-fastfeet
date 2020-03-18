import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';

import ActionMenu from '~/components/ActionMenu';

import api from '~/services/api';
import history from '~/services/history';

import { TableWrapper } from '~/pages/_layouts/default/styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');
      setRecipients(response.data);
    }

    loadRecipients();
  }, []);

  async function handleSearch(e) {
    const q = e.target.value;

    const response = await api.get('recipients', {
      params: {
        q,
      },
    });

    setRecipients(response.data);
  }

  function handleUpdate(id) {
    history.push(`/recipients/edit/${id}`);
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir a Destinatário?')) {
      await api.delete(`recipients/${id}`);
    }
  }

  return (
    <>
      <header>
        <h1>Gerenciando destinatários</h1>
        <nav>
          <div>
            <MdSearch size={20} />
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Buscar por destinatários"
              onChange={handleSearch}
            />
          </div>

          <aside>
            <Link to="/recipients/new">
              <MdAdd size={18} />
              Cadastrar
            </Link>
          </aside>
        </nav>
      </header>

      <TableWrapper>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <tr key={recipient.id}>
              <td>{`#${recipient.id}`}</td>
              <td>{recipient.name}</td>
              <td>{`${recipient.address}, ${recipient.address_number}, ${recipient.city} - ${recipient.state}`}</td>
              <td>
                <ActionMenu
                  id={recipient.id}
                  onEdit={handleUpdate}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </>
  );
}
