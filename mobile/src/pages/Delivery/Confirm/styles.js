import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 50px 25px 10px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const Camera = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  margin: 10px;
`;

export const CameraInput = styled(RNCamera)`
  flex: 1;
`;

export const CameraButton = styled.TouchableOpacity`
  align-self: center;

  position: absolute;
  bottom: 0;

  background: #0000004d;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin: 20px;

  width: 60px;
  height: 60px;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
`;
