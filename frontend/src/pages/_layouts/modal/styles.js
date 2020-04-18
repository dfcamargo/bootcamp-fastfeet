import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.7);

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: ${props => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px #00000033;

  padding: 25px;
  margin: 5px;

  height: 400px;
  width: 450px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #eee;

    border: 1px solid #eee;
    border-radius: 25px;

    position: absolute;
    right: 0;
    top: 0;

    margin: 5px;

    height: 25px;
    width: 25px;

    &:hover {
      background: ${darken(0.05, '#eee')};
    }
  }
`;

export const Content = styled.div`
  border-bottom: 1px solid #eee;

  color: #666;
  font-size: 16px;
  line-height: 26px;

  margin: 6px 0;
  padding: 6px 0;

  h2 {
    color: #444;
    font-size: 14px;
    line-height: 19px;
  }

  strong {
    color: #444;
    margin-right: 5px;
  }

  &:last-child {
    flex: 1;

    display: flex;
    flex-direction: column;

    border-bottom: 0;

    img {
      align-self: center;
      border-radius: 4px;
      margin-top: 10px;
      height: 80px;
      width: 250px;
    }
  }
`;
