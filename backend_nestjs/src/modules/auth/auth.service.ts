import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { AuthConfig } from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';

interface User {
    id: string;
    name: string;
    email: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Injectable(AuthConfig.key)
        private config: ConfigType<typeof AuthConfig>,
    ) {}

    login(user: User){
        const payload = { ...user };
        return jwt.sign(payload, this.config.jwtSecret, {
            expiresIn: '1d',
            audience: 'example.com',
            issuer: 'example.com',
        });
    }

    verify(jwtString: string) {

    }
}