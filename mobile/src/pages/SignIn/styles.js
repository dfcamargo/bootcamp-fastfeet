import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Background = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7d40e7;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 25px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input)`
  margin-top: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
