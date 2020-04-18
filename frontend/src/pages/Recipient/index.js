import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Table } from '~/components/Table';

import ActionMenu from '~/components/ActionMenu';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);

  /** controle de páginas */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  /** pesquisa */
  const [search, setSearch] = useState(null);

  useEffect(() => {
    async function loadRecipients() {
      /** pesquisa encomenda pelo produto */
      const q = search || null;

      const response = await api.get('recipients', {
        params: {
          page: currentPage,
          q,
        },
      });

      setRecipients(response.data.recipients);

      /** ajusta dados da página */
      setTotalPage(response.data.total_page);
    }

    /** consulta destinatários */
    loadRecipients();
  }, [currentPage, search]);

  function handleUpdate(id, data) {
    /** redireciona para página de alteração */
    history.push(`/recipients/edit/${id}`, data);
  }

  async function handleDelete(id) {
    /** confirmação e exclusão */
    if (window.confirm('Deseja realmente excluir o destinatário?')) {
      try {
        await api.delete(`recipients/${id}`);

        /** mensagem de sucesso */
        toast.success('Destinatário excluído com sucesso!');
      } catch (err) {
        /** mensagem de erro */
        toast.error(`Ops... Ocorreu um erro! ${err}`);
      }
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
              onChange={e => setSearch(e.target.value)}
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

      <Table>
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
                  data={recipient}
                  onEdit={handleUpdate}
                  onDelete={handleDelete}
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
    </>
  );
}
