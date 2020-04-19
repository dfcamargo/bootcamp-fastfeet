import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 50px 25px 10px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const FormInput = styled(Input)`
  flex: 1;
  background: #fff;
  opacity: 1;
  border: 1px solid #ccc;
  margin: 20px 0;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
`;
