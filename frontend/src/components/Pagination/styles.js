import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: flex;

    li {
      /* border: 1px solid; */
      display: flex;
      align-items: stretch;

      height: 30px;
      width: 30px;

      margin: 0 5px;

      color: #666;
      font-size: 16px;

      a {
        padding: 5px 10px;
        cursor: pointer;
      }

      &.disabled {
        color: #c6c6c6;
      }

      &.active {
        border: 1px solid;
        border-radius: 50%;
        font-weight: bold;
        background: #7d40e7;
        color: #fff;
      }
    }
  }
`;
