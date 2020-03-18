import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';

import ActionMenu from '~/components/ActionMenu';

import history from '~/services/history';
import api from '~/services/api';

import {
  TableWrapper,
  TableImage,
  TableStatus,
} from '~/pages/_layouts/default/styles';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get('deliveries');
      setDeliveries(response.data);
    }

    loadDeliveries();
  }, []);

  function handleView() {}

  function handlUpdate(id) {
    history.push(`deliveries/edit/${id}`);
  }

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir a Encomenda?')) {
      await api.delete(`deliveries/${id}`);
    }
  }

  async function handleSearch(e) {
    const q = e.target.value;

    const response = await api.get('deliveries', {
      params: {
        q,
      },
    });

    setDeliveries(response.data);
  }

  return (
    <>
      <header>
        <h1>Gerenciando encomendas</h1>
        <nav>
          <div>
            <MdSearch size={20} />
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Buscar por encomendas"
              onChange={handleSearch}
            />
          </div>

          <aside>
            <Link to="/deliveries/new">
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
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>{`#${delivery.id}`}</td>
              <td>{delivery.recipient.name}</td>
              <td>
                <TableImage>
                  {delivery.deliveryman.avatar && (
                    <img
                      src={delivery.deliveryman.avatar.url}
                      alt={delivery.deliveryman.name}
                    />
                  )}
                  {delivery.deliveryman.name}
                </TableImage>
              </td>
              <td>{delivery.recipient.city}</td>
              <td>{delivery.recipient.state}</td>
              <td>
                <TableStatus color={delivery.status}>
                  {delivery.status}
                </TableStatus>
              </td>
              <td>
                <ActionMenu
                  id={delivery.id}
                  onView={handleView}
                  onEdit={handlUpdate}
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
