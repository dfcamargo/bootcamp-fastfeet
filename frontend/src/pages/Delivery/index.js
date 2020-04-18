import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Table, TableImage, TableStatus } from '~/components/Table';
import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';

import ModalLayout from '~/pages/_layouts/modal';
import DeliveryModal from '~/components/DeliveryModal';

import history from '~/services/history';
import api from '~/services/api';

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  /** controle de páginas */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  /** pesquisa */
  const [search, setSearch] = useState(null);

  const [show, setShow] = useState(false);
  const [modalDelivery, setModalDelivery] = useState(null);

  useEffect(() => {
    async function loadDeliveries() {
      /** pesquisa encomenda pelo produto */
      const q = search || null;

      const response = await api.get('deliveries', {
        params: {
          page: currentPage,
          q,
        },
      });

      setDeliveries(response.data.orders);

      /** ajusta dados da página */
      setTotalPage(response.data.total_page);
    }

    /** consulta encomendas */
    loadDeliveries();
  }, [currentPage, search]);

  function handleView(data) {
    /** exibe o modal */
    setModalDelivery(data);
    setShow(true);
  }

  function handlUpdate(id, data) {
    /** redireciona para página de alteração */
    history.push(`deliveries/edit/${id}`, data);
  }

  async function handleDelete(id) {
    /** confirmação e exclusão */
    if (window.confirm('Deseja realmente excluir a encomenda?')) {
      try {
        await api.delete(`deliveries/${id}`);

        /** mensagem de sucesso */
        toast.success('Encomenda excluída com sucesso!');
      } catch (err) {
        /** mensagem de erro */
        toast.error(`Ops... Ocorreu um erro! ${err}`);
      }
    }
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
              onChange={e => setSearch(e.target.value)}
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

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Produto</th>
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
                  <img
                    src={
                      delivery.deliveryman.avatar
                        ? delivery.deliveryman.avatar.url
                        : `https://api.adorable.io/avatars/34/${delivery.deliveryman.name}.png`
                    }
                    alt={delivery.deliveryman.name}
                  />
                  {delivery.deliveryman.name}
                </TableImage>
              </td>
              <td>{delivery.product}</td>
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
                  data={delivery}
                  onView={handleView}
                  onEdit={delivery.start_date ? null : handlUpdate}
                  onDelete={delivery.start_date ? null : handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        pageCount={totalPage}
        onPageChange={e => {
          setCurrentPage(e.selected + 1);
        }}
      />

      {show && (
        <ModalLayout onClose={setShow}>
          <DeliveryModal delivery={modalDelivery} />
        </ModalLayout>
      )}
    </>
  );
}
