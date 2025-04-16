import { MailerService } from '@nestjs-modules/mailer';
import { Process } from '@nestjs/bull';

export class AuthProcessor {
  constructor(private readonly mail: MailerService) {}
  @Process('verifyEmailAddress')
  async sendVerificationEmail(job: any) {
    const { data } = job;
    try {
      await this.mail.sendMail({
        ...data,
        subject: 'Verify your email address',
        template: 'verify-email',
        context: {
          otp: data.otp,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
