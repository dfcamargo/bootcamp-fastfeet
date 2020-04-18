import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-content: center;
`;

export const Avatar = styled.Image`
  align-self: center;
  border-radius: 80px;
  height: 140px;
  width: 140px;
`;

export const Form = styled.View`
  padding: 40px 35px;
`;

export const Label = styled.Text`
  color: #666;
  font-size: 12px;
  line-height: 26px;
`;

export const FormText = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;
