import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 40px 20px 10px;
`;

export const Profile = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;

export const Info = styled.View`
  flex: 1;
  margin: 0 12px;
`;

export const Welcome = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const LogoutButton = styled(RectButton)`
  background: #fff;
`;

export const Delivery = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const LinkButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const LinkButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.selected ? '#7d40e7' : '#999')};
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const DeliveryList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const EmptyItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: #999;
  font-style: italic;
`;
