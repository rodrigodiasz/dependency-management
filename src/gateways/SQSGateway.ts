import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { IQueueGateway } from '../interfaces/gateways/IQueueGateway';

export class SQSGateway implements IQueueGateway {
  private client = new SQSClient({ region: 'sa-east-1' });

  async publishMessage(message: Record<string, unknown>): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/349438100491/ProcessPaymentQueue',
      MessageBody: JSON.stringify(message),
    });

    await this.client.send(command);
  }
}
