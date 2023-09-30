import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admin/Models/admin.models';
import { User } from 'src/user/Models/user.models';


@Injectable()
export class MailService {
  sendConfirmation(arg0: User) {
    throw new Error('Method not implemented.');
  }
  constructor(private mailerService: MailerService){}

  async sendUserConfirmation(user: User): Promise<void>{
    const url = `${process.env.API_HOST}/api/user/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Stadium App! Confirum your Email',
      template: "./confirmation",
      context: {
        name: user.first_name,
        url,
      }
    })
  }

  async sendAdminConfirmation(admin: Admin): Promise<void>{
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Stadium App! Confirum your Email',
      template: "./confirmation",
      context: {
        name: admin.username,
        url,
      }
    })
  }
}


