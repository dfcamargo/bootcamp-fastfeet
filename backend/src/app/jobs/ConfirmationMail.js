import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { order } = data;

    console.log('Confirmação: A fila executou');

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: `FastFeed: Nova entrega`,
      template: 'confirmation',
      context: {
        deliveryman: order.deliveryman.name,
        order: order.id,
        product: order.product,
        recipient: order.recipient.name,
        address: order.recipient.full_address,
      },
    });
  }
}

export default new ConfirmationMail();
