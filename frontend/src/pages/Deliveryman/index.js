import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Table, TableImage } from '~/components/Table';
import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

export default function Deliveryman() {
  const [deliverymen, setDeliverymen] = useState([]);

  /** controle de páginas */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  /** pesquisa */
  const [search, setSearch] = useState(null);

  useEffect(() => {
    async function loadDeliverymen() {
      /** pesquisa encomenda pelo produto */
      const q = search || null;

      const response = await api.get('deliverymen', {
        params: {
          page: currentPage,
          q,
        },
      });

      setDeliverymen(response.data.deliverymen);

      /** ajusta dados da página */
      setTotalPage(response.data.total_page);
    }

    /** consulta entregadores */
    loadDeliverymen();
  }, [currentPage, search]);

  function handleUpdate(id, data) {
    /** redireciona para página de alteração */
    history.push(`/deliverymen/edit/${id}`, data);
  }

  async function handleDelete(id) {
    /** confirmação e exclusão */
    if (window.confirm('Deseja realmente excluir o entregador?')) {
      try {
        await api.delete(`deliverymen/${id}`);

        /** mensagem de sucesso */
        toast.success('Entregador excluído com sucesso!');
      } catch (err) {
        /** mensagem de erro */
        toast.error(`Ops... Ocorreu um erro! ${err}`);
      }
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
              onChange={e => setSearch(e.target.value)}
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

      <Table>
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
                  <img
                    src={
                      deliveryman.avatar
                        ? deliveryman.avatar.url
                        : `https://api.adorable.io/avatars/34/${deliveryman.name}.png`
                    }
                    alt={deliveryman.name}
                  />
                </TableImage>
              </td>
              <td>{deliveryman.name}</td>
              <td>{deliveryman.email}</td>
              <td>
                <ActionMenu
                  id={deliveryman.id}
                  data={deliveryman}
                  onEdit={handleUpdate}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPage !== 0 && (
        <Pagination
          pageCount={totalPage}
          onPageChange={e => {
            setCurrentPage(e.selected + 1);
          }}
        />
      )}
    </>
  );
}
