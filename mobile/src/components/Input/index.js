import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TextInput } from './styles';

function Input({ style, icon, ...rest }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(153,153,153, 0.8)" />}
      <TextInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
};

export default forwardRef(Input);
