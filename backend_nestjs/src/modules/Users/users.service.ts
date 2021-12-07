import {Injectable} from "@nestjs/common";
import {EmailService} from "../email/email.service";
import uuid from  'uuid';

@Injectable()
export class UsersService {
    constructor(
        private emailService: EmailService
    ) {
    }


    async createUser(name: string,email: string,password: string){
        await this.checkUserExists(email);

        const singUpVerifyToken = '6c84fb90-12c4-11e1-840d-7b25c5ee775a';

        await this.saveUser(name, email, password, singUpVerifyToken);
        await this. sendMemberJoinEmail(email, singUpVerifyToken);
    }

    async checkUserExists(email: string){

    }

    async saveUser(name: string, email: string, password: string, signUpVerifyToken: string){

    }

    async sendMemberJoinEmail(email: string, signUpVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email,signUpVerifyToken);
    }
}