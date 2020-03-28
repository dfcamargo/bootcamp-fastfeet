import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { order } = data;
    const { description } = data;

    console.log('Cancelamento: A fila executou');

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: `FastFeed: Entrega cancelada`,
      template: 'cancellation',
      context: {
        deliveryman: order.deliveryman.name,
        order: order.id,
        problem: description,
        recipient: order.recipient.name,
        product: order.product,
      },
    });
  }
}

export default new CancellationMail();
