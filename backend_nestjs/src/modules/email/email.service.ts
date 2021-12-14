import {Injectable} from "@nestjs/common";
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.Google,
                pass: process.env.Password,
            }
        });

    }

    async sendMemberJoinVerification(emailAddress,signUpVerifyToken){
        const baseUrl = 'http://localhost:3000'; // TODO: config

        const url = `${baseUrl}/users/email-verifiy?signupVerifyToken=${signUpVerifyToken}`;

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `
        }

        return await this.send(mailOptions)
    }

    private async send(mailOptions: EmailOptions) {
        return await this.transporter.sendMail(mailOptions);
    }


}