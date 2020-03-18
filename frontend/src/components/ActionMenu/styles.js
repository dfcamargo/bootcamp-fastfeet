import styled from 'styled-components';

export const Container = styled.div`
  button {
    border: 0;
    padding: 0 2px;
    background: none;
    color: #c6c6c6;
  }
`;

export const Wrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: relative;

  & > span.arrow {
    position: absolute;
    top: -9px;
    height: 0;
    right: 0;
    width: 0;
    border-right: 9px solid transparent;
    border-left: 9px solid transparent;
    border-bottom: 9px solid #00000026;
  }

  ul {
    position: absolute;
    right: -70px;
    background: #fff;
    color: #999;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0px 0px 2px #00000026;
    width: 150px;

    li {
      display: flex;
      align-items: center;
      margin: 0 10px;
      padding: 10px 5px;
      transition: background 0.3s;

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }

      svg {
        margin-right: 5px;
      }

      button {
        flex: 1;
        text-align: left;
      }
    }
  }
`;
