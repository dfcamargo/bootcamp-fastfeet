import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Table = styled.table`
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
    height: 35px;
    width: 35px;
    border-radius: 50%;
    margin-right: 10px;
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
