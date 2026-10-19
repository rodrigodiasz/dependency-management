import { IEmailGateway } from '../interfaces/gateways/IEmailGateway';

export class ResendGateway implements IEmailGateway {
  sendEmail(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
