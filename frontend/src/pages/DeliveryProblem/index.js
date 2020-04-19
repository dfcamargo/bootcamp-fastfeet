import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import ActionMenu from '~/components/ActionMenu';

import api from '~/services/api';

import { Table } from '~/components/Table';
import Pagination from '~/components/Pagination';

import ModalLayout from '~/pages/_layouts/modal';
import ProblemModal from '~/components/ProblemModal';

export default function DeliveryProblem() {
  const [problems, setProblems] = useState([]);

  /** controle de páginas */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(0);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems', {
        params: {
          page: currentPage,
        },
      });

      setProblems(response.data.problems);

      /** ajusta dados da página */
      setTotalPage(response.data.total_page);
    }

    /** consulta problemas */
    loadProblems();
  }, [currentPage]);

  function handleView(data) {
    /** exibe o modal */
    setModalData(data);
    setShow(true);
  }

  async function handleDelete(id) {
    /** confirmação e exclusão */
    if (window.confirm('Deseja realmente cancelar a encomenda?')) {
      try {
        await api.delete(`problem/${id}/cancel_delivery`);

        /** mensagem de sucesso */
        toast.success('Encomenda cancelada com sucesso!');
      } catch (err) {
        /** mensagem de erro */
        toast.error(`Ops... Ocorreu um erro! ${err}`);
      }
    }
  }

  return (
    <>
      <header>
        <h1>Problemas na entrega</h1>
      </header>

      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem._id}>
              <td>{`#${problem.order_id}`}</td>
              <td>{problem.description}</td>
              <td>
                <ActionMenu
                  id={problem._id}
                  data={problem}
                  onView={handleView}
                  deleteLabel="Cancelar encomenda"
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

      {show && (
        <ModalLayout onClose={setShow}>
          <ProblemModal problem={modalData} />
        </ModalLayout>
      )}
    </>
  );
}
