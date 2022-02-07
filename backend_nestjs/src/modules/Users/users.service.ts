import {Injectable, NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import {EmailService} from "../email/email.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../db/repository/User/user.entity";
import {Repository} from "typeorm";
import {ulid} from "ulid";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private emailService: EmailService,
    ) {}

    async createUser(name: string,email: string,password: string){
        const userExist = await this.checkUserExists(email);
        if(userExist){
            throw new UnprocessableEntityException('존재하는 이메일 주소 입니다.');
        }

        await this.checkUserExists(email);
        const singUpVerifyToken = ulid();
        email = process.env.Google;

        await this.saveUser(name, email, password, singUpVerifyToken);
        await this. sendMemberJoinEmail(email, singUpVerifyToken);

        return {
            result: true,
            getData: 'test',
        }
    }

    private async checkUserExists(email: string){
        const user = await this.usersRepository.findOne({email: email});
        return user !== undefined;
    }

    private async saveUser(name: string, email: string, password: string, signUpVerifyToken: string){
        const user = new UserEntity();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = password;
        user.signupVerifyToken = signUpVerifyToken;
        await this.usersRepository.save(user);
    }

    async sendMemberJoinEmail(email: string, signUpVerifyToken: string){
        await this.emailService.sendMemberJoinVerification(email,signUpVerifyToken);
    }

    // async verifyEmail(signupVerifyToken: string){
    //     const user = await this.usersRepository.findOne({signupVerifyToken});
    //
    //     if(!user){
    //         throw new NotFoundException('User does not exist');
    //     }
    //
    //     return this.authService.login({
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //     });
    // }
}