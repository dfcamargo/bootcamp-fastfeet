import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 50px 25px 10px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-top: 15px;
`;

export const ProblemList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const ProblemItem = styled.View`
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  min-height: 60px;
  margin-top: 15px;

  padding: 15px 20px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #999;
  flex: 1;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
