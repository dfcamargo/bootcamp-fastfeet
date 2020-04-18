import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #f5f5f5;
  overflow: auto;
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
