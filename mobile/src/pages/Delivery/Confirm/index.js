import React, { useRef, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Form,
  Camera,
  CameraInput,
  CameraButton,
  SubmitButton,
} from './styles';

export default function Confirm({ navigation: { getParam, goBack } }) {
  const [signature, setSignature] = useState(null);

  const refCamera = useRef(null);

  const id = getParam('id');

  async function takePicture() {
    if (refCamera) {
      const options = { quality: 0.5, base64: true };
      const data = await refCamera.current.takePictureAsync(options);

      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        name: `Signature${data.uri}.jpg`,
        path: `Signature${data.uri}.jpg`,
        type: 'image/*',
      });

      try {
        const response = await api.post('file', formData);

        const { id: signatureId } = response.data;

        setSignature(signatureId);

        Alert.alert('Sucesso', 'Foto criada com sucesso');
      } catch (err) {
        Alert.alert('Error', err.response.data.message);
      }
    }
  }

  async function handleSubmit() {
    try {
      await api.put(`deliveries/${id}/delivered`, {
        signature_id: signature,
      });

      goBack();
    } catch (err) {
      Alert.alert('Error', err.response.data.message);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <Camera>
            <CameraInput
              ref={refCamera}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar a câmera',
                message: 'Precisamos da sua permissão para usar a câmera',
                buttonPositive: 'Sim',
                buttonNegative: 'Não',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permissão para usar o áudio',
                message: 'Precisamos da sua permissão para usar o áudio',
                buttonPositive: 'Sim',
                buttonNegative: 'Não',
              }}
            />
            <CameraButton onPress={takePicture}>
              <Icon name="photo-camera" size={30} color="#fff" />
            </CameraButton>
          </Camera>
          <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

Confirm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
