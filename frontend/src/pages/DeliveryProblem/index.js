import React, { useState, useEffect } from 'react';

import ActionMenu from '~/components/ActionMenu';

import api from '~/services/api';

import { TableWrapper } from '~/pages/_layouts/default/styles';

export default function DeliveryProblem() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('problems');
      setProblems(response.data);
    }

    loadProblems();
  }, []);

  function handleView() {}

  function handleDelete() {}

  return (
    <>
      <header>
        <h1>Problemas na entrega</h1>
      </header>

      <TableWrapper>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id}>
              <td>{`#${problem.id}`}</td>
              <td>{problem.description}</td>
              <td>
                <ActionMenu
                  id={problem.id}
                  onView={handleView}
                  deleteLabel="Cancelar encomenda"
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
