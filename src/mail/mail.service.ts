import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/Models/user.models';


@Injectable()
export class MailService {
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


















  

  // create(createMailDto: CreateMailDto) {
  //   return 'This action adds a new mail';
  // }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  // update(id: number, updateMailDto: UpdateMailDto) {
  //   return `This action updates a #${id} mail`;
  // }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
