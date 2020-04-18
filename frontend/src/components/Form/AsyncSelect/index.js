import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

export default function SelectInput({ name, ...rest }) {
  const selectRef = useRef();
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }

        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return <AsyncSelect ref={selectRef} {...rest} />;
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
};
