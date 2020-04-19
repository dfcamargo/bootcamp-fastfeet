import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 50px 25px 10px;
`;

export const Delivery = styled.ScrollView`
  flex: 1;
`;

export const DeliveryInfo = styled.View`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;

  margin: 10px 0 5px;
  padding: 20px 15px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 5px;
`;
export const Info = styled.View``;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  margin-top: 10px;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #666;
`;

export const Status = styled.View``;

export const Date = styled.View`
  flex-direction: row;
`;
export const DateItem = styled.View`
  margin-right: 50px;
`;

export const Footer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const ActionButton = styled.TouchableOpacity`
  background: #f8f9fd;
  border: 1px solid #0000001a;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex: 1;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const ButtonText = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  width: 70px;
`;
