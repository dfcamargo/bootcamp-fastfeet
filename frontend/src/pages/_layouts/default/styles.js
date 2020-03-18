import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #f5f5f5;
  height: 100%;
`;

export const Content = styled.div`
  margin: 34px auto;
  width: 100%;
  max-width: 1600px;
  padding: 0 30px;

  header {
    h1 {
      font-size: 24px;
      color: #444;
      flex: 1;
    }

    nav {
      display: flex;
      margin: 34px 0 22px;

      div {
        position: relative;

        flex: 1;
        display: flex;
        align-items: center;
        color: #999;

        svg {
          position: absolute;
          left: 10px;
        }

        input {
          padding: 9px 15px 9px 35px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 240px;

          &::placeholder {
            color: #999;
          }
        }
      }

      aside {
        display: flex;
        height: 36px;

        button[type='button'] {
          display: flex;
          align-items: center;

          background: #ccc;
          border: 0;
          border-radius: 4px;

          margin: 0 16px 0 10px;
          padding: 0 15px 0 5px;

          color: #fff;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;

          transition: background 0.3s;

          svg {
            margin: 0 5px 0 10px;
          }

          &:hover {
            background: ${darken(0.03, '#ccc')};
          }
        }

        a,
        button[type='submit'] {
          display: flex;
          align-items: center;

          background: #7d40e7;
          border: 0;
          border-radius: 4px;

          color: #fff;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;

          padding: 0 30px 0 5px;

          transition: background 0.3s;

          svg {
            margin: 0 5px 0 10px;
          }

          &:hover {
            background: ${darken(0.03, '#7d40e7')};
          }
        }
      }
    }
  }
`;

export const TableWrapper = styled.table`
  font-size: 16px;
  border-collapse: separate;
  border-spacing: 0 20px;

  width: 100%;

  th {
    text-align: left;
    padding: 0 25px 0;

    &:last-child {
      text-align: right;
    }
  }

  tbody {
    color: #666;
    font-size: 16px;
    text-align: left;

    tr {
      background: #fff;

      td {
        padding: 20px 25px 16px;

        &:last-child {
          text-align: right;
        }
      }
    }
  }
`;

export const TableImage = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const TableStatus = styled.span`
  border-radius: 25px;
  padding: 5px 15px;

  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;

  ${props => {
    switch (props.color) {
      case 'retirada':
        return css`
          background: #bad2ff;
          color: ${darken(0.5, '#bad2ff')};
        `;
      case 'entregue':
        return css`
          background: #dff0df;
          color: ${darken(0.5, '#dff0df')};
        `;
      case 'cancelado':
        return css`
          background: #fab0b0;
          color: ${darken(0.5, '#fab0b0')};
        `;
      default:
        return css`
          background: #f0f0df;
          color: ${darken(0.5, '#f0f0df')};
        `;
    }
  }}

  &::before {
    content: '•';
    margin-right: 5px;
  }
`;

export const FormWrapper = styled.div`
  background: #fff;
  border-radius: 4px;

  margin: 34px auto;
  padding: 0 30px;
  width: 100%;
  max-width: 1600px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 28px 30px;

    label {
      display: block;
      text-align: left;
      margin-bottom: 15px;

      color: #444;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;

      width: 100%;

      & > input {
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
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
  grid-gap: ${props => props.gridGap};
  width: 100%;
`;
