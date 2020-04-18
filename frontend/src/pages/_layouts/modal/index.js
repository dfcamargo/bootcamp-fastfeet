import React from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, Wrapper } from './styles';

export default function ModalLayout({ children, onClose }) {
  /** rotina para fechar o modal */
  function handleClose() {
    onClose(false);
  }

  return (
    <Container visible>
      <Wrapper>
        <button type="button" onClick={handleClose}>
          <MdClose size={16} />
        </button>

        {children}
      </Wrapper>
    </Container>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
