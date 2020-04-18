import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField } = useField(name);
  const { defaultValue } = useField('avatar');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [fileId, setFileId] = useState(defaultValue && defaultValue.id);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.fileid',
    });
  }, [fieldName, registerField]);

  async function handleChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('file', data);

      const { id, url } = response.data;

      setPreview(url);
      setFileId(id);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <label className="avatar" htmlFor={name}>
        <img
          src={
            preview || 'https://api.adorable.io/avatars/150/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id={name}
          accept="image/*"
          data-fileid={fileId}
          onChange={handleChange}
          ref={inputRef}
          {...rest}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
