import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 25px 0 12px;
`;

export const Steps = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 60px 5px;
`;

export const Dot = styled.View`
  height: 10px;
  width: 10px;
  border: 1px solid #7d40e7;
  border-radius: 5px;
  background: ${props => (props.doted ? '#7d40e7' : '#fff')};
`;

export const Line = styled.View`
  border: 1px solid #7d40e7;
  flex: 1;
  height: 1px;
`;

export const LabelSteps = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  flex-wrap: wrap;
  color: #999;

  width: 80px;
  margin: 0 20px;
`;
