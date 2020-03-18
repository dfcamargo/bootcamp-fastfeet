import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #7d40e7;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;
  height: 425px;
  max-width: 360px;
  width: 100%;

  text-align: center;

  img {
    width: 280px;
    margin-top: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 40px 30px 0;

    label {
      display: block;
      text-align: left;
      margin-bottom: 15px;

      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;

      input {
        display: block;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #999;
        font-size: 16px;
        margin-top: 9px;
        padding: 12px 15px;
        width: 100%;

        &::placeholder {
          color: #999;
        }
      }

      span {
        font-size: 10px;
        color: #de3b3b;
      }
    }

    button {
      background: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      padding: 15px 10px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
