import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 50px 25px 10px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const FormInput = styled(Input)`
  height: 300px;
  background: #fff;
  opacity: 1;
  border: 1px solid #ccc;
  margin: 20px 0;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
`;
