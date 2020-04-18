import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdEdit, MdDelete } from 'react-icons/md';

import { Container, Wrapper } from './styles';

export default function ActionMenu({
  id,
  data,
  viewLabel,
  onView,
  editLabel,
  onEdit,
  deleteLabel,
  onDelete,
}) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={handleVisible}>
        <MdMoreHoriz size={30} />
      </button>

      <Wrapper visible={visible}>
        <span className="arrow" />
        <ul>
          {onView && (
            <li>
              <MdVisibility size={18} color="#8e5be8" />
              <button
                type="button"
                onClick={() => {
                  handleVisible();
                  onView(data);
                }}
              >
                {viewLabel}
              </button>
            </li>
          )}

          {onEdit && (
            <li>
              <MdEdit size={18} color="#4d85ee" />
              <button
                type="button"
                onClick={() => {
                  handleVisible();
                  onEdit(id, data);
                }}
              >
                {editLabel}
              </button>
            </li>
          )}

          {onDelete && (
            <li>
              <MdDelete size={18} color="#de3b3b" />
              <button
                type="button"
                onClick={() => {
                  handleVisible();
                  onDelete(id);
                }}
              >
                {deleteLabel}
              </button>
            </li>
          )}
        </ul>
      </Wrapper>
    </Container>
  );
}

ActionMenu.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,

  viewLabel: PropTypes.string,
  onView: PropTypes.func,
  editLabel: PropTypes.string,
  onEdit: PropTypes.func,
  deleteLabel: PropTypes.string,
  onDelete: PropTypes.func,
};

ActionMenu.defaultProps = {
  viewLabel: 'Visualizar',
  onView: null,
  editLabel: 'Editar',
  onEdit: null,
  deleteLabel: 'Excluir',
  onDelete: null,
};
