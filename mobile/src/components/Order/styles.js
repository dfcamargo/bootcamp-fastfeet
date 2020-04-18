import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 10px 0 20px;

  border: 1px solid #ccc;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;

  margin-left: 10px;
`;

export const Footer = styled.View`
  background: #f8f9fd;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Info = styled.View`
  margin: 20px 0;
`;

export const Label = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #999;
`;

export const Text = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export const ActionLink = styled.TouchableOpacity``;

export const ActionLinkText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #7d40e7;
`;
