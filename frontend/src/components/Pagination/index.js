import React from 'react';
import ReactPaginate from 'react-paginate';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container } from './styles';

export default function Pagination(props) {
  return (
    <Container>
      <ReactPaginate
        previousLabel={<MdChevronLeft size={18} />}
        nextLabel={<MdChevronRight size={18} />}
        breakLabel="..."
        breakClassName="break-me"
        pageRangeDisplayed={3}
        activeClassName="active"
        {...props}
      />
    </Container>
  );
}
