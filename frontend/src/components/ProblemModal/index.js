import React from 'react';
import PropTypes from 'prop-types';

import { Content } from '~/pages/_layouts/modal/styles';

export default function ProblemModal({ problem }) {
  return (
    <>
      <Content>
        <h2>Visulizar Problema</h2>
        <p>{problem.description}</p>
      </Content>
    </>
  );
}

ProblemModal.propTypes = {
  problem: PropTypes.instanceOf(Object).isRequired,
};
