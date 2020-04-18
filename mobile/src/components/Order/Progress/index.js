import React from 'react';

import { Container, Steps, Dot, Line, LabelSteps, Label } from './styles';

export default function Progress({ start, end }) {
  return (
    <Container>
      <Steps>
        <Dot doted />
        <Line />
        <Dot doted={start} />
        <Line />
        <Dot doted={end} />
      </Steps>
      <LabelSteps>
        <Label>Aguardando Retirada</Label>
        <Label>Retirada</Label>
        <Label>Entregue</Label>
      </LabelSteps>
    </Container>
  );
}
