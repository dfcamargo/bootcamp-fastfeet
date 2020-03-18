import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';

import ActionMenu from '~/components/ActionMenu';

import api from '~/services/api';
import history from '~/services/history';

import { TableWrapper, TableImage } from '~/pages/_layouts/default/styles';

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function loadDeliverymans() {
      const response = await api.get('deliverymen');
      setDeliverymen(response.data);
    }

    loadDeliverymans();
  }, []);

  async function handleSearch(e) {
    const q = e.target.value;

    const response = await api.get('deliverymen', {
      params: {
        q,
      },
    });

    setDeliverymen(response.data);
  }

  function handleUpdate(id) {
    history.push(`/deliverymen/edit/${id}`);
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir o Entregador?')) {
      await api.delete(`deliverymen/${id}`);
    }
  }

  return (
    <>
      <header>
        <h1>Gerenciando entregadores</h1>
        <nav>
          <div>
            <MdSearch size={20} />
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Buscar por entregadores"
              onChange={handleSearch}
            />
          </div>

          <aside>
            <Link to="/deliverymen/new">
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
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.map(deliveryman => (
            <tr key={deliveryman.id}>
              <td>{`#${deliveryman.id}`}</td>
              <td>
                <TableImage>
                  {deliveryman.avatar && (
                    <img
                      src={deliveryman.avatar.url}
                      alt={deliveryman.avatar.url}
                    />
                  )}
                </TableImage>
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <ActionMenu
                  id={deliveryman.id}
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
