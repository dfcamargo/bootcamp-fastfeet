import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'deliverymen/session', {
      id,
    });

    const { user } = response.data;

    yield put(signInSuccess(id, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Usuário e/ou senha inválidos');

    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
