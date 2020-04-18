import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  height: 150px;
  width: 150px;

  label.avatar {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      display: flex;
      border-radius: 50%;
      background: #fff;
      height: 150px;
      width: 150px;
    }

    input {
      display: none;
    }
  }
`;
