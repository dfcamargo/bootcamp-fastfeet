import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  height: 64px;
  padding: 0 30px;

  display: flex;
  align-items: center;

  img {
    width: 150px;
    margin-right: 30px;
    padding-right: 30px;
    border-right: 1px solid #ddd;
  }

  ul {
    display: flex;
    align-items: center;
    width: 100%;

    li {
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;

      & + li {
        margin-left: 20px;
      }

      a {
        color: #999;

        &:hover {
          color: #444;
        }
      }

      &:last-child {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        flex: 1;

        font-size: 14px;
        color: #666;
        text-transform: none;

        button {
          border: 0;
          background: none;

          margin-top: 5px;
          color: #de3b3b;
          font-weight: normal;

          &:hover {
            color: ${darken(0.05, '#de3b3b')};
          }
        }
      }
    }
  }
`;
