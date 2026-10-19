
import { Inject } from '../di/Inject';
import { Order } from '../entities/Order';
import { IEmailGateway } from '../interfaces/gateways/IEmailGateway';
import { IQueueGateway } from '../interfaces/gateways/IQueueGateway';
import { IOrdersRepository } from '../interfaces/repositories/IOrdersRepository';

export class PlaceOrder {
  constructor(
    @Inject('EmailGateway') private readonly emailGateway: IEmailGateway,
    @Inject('OrdersRepository') private readonly ordersRepository: IOrdersRepository,
    @Inject('QueueGateway') private readonly queueGateway: IQueueGateway,
  ) {}

  async execute() {
    const customerEmail = 'mateus@jstack.com.br';
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    await this.ordersRepository.create(order);
    await this.queueGateway.publishMessage({ orderId: order.id });
    await this.emailGateway.sendEmail({
      from: 'JStore <noreply@mateus.dev.br>',
      to: [customerEmail],
      subject: `Pedido #${order.id} confirmado!`,
      html: `<h1>E aí, Mateus!</h1>
            <p>Passando aqui só pra avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal aqui no seu e-mail!</p>
            <small>{{ tabela com os itens do pedido }}</small>
      `,
    });

    return { orderId: order.id };
  }
}
