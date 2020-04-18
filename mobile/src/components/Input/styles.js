import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 45px;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(153,153,153, 0.7)',
})`
  /* flex: 1; */
  font-size: 16px;
  margin-left: 10px;
  color: #999;
`;
