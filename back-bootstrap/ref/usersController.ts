import {DB} from '../db/db';
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import { TOKEN_EXP, ENC_KEY, IS_DEV } from '../env/env';
export namespace USERS {

    export interface ILoginInfo {
        userId: string,
        userPwd: string
    }

    export class UsersController {
        async login(loginInfo: ILoginInfo) {
            try {
                const user = await this.getUser(loginInfo);

                if(!user.length) throw new Error('로그인 정보를 다시 확인해 주세요.');
                // const hashPWD = crypto.createHash('sha512').update(userPwd).digest('base64');// 암호화

                const { memberName, memberCode, auth } = user[0];

                const token = jwt.sign({
                    ...loginInfo,
                    auth,
                    exp: TOKEN_EXP(),
                },IS_DEV ? ENC_KEY.DEV : ENC_KEY.PROD)

                return {
                    result: true,
                    token,
                    auth,
                    memberName,
                    memberCode,
                };
            }catch (e) {
                throw new Error(e);
            }

        }

        async verify ({ token }: { token: string }) {
            try {
                const verified = jwt.verify(token, IS_DEV ? ENC_KEY.DEV : ENC_KEY.PROD);
                if (verified === null) throw new Error('로그인 정보를 확인해주세요');

                const loginInfo = verified as ILoginInfo;
                const user = await this.getUser(loginInfo)
                const { auth, memberName, memberCode } = user[0];

                const newToken = jwt.sign({
                    ...loginInfo,
                    auth,
                    exp: TOKEN_EXP(),
                }, IS_DEV ? ENC_KEY.DEV : ENC_KEY.PROD);
                return {
                    result: true,
                    token: newToken,
                    auth,
                    memberName,
                    memberCode,
                };
            } catch (e) {
                if(e.name === 'TokenExpiredError') throw new Error('토큰이 만료되었습니다. 로그인을 다시 해주세요')

                throw e;
            }
        }

        private async getUser(loginInfo: ILoginInfo) {
            const { userId, userPwd } = loginInfo;
            const query = `
                    select
                        MEMBER_NAME as memberName,
                        MEMBER_CODE as memberCode,
                        auth
                    from pmi.USER
                    where USER_ID = '${ userId }'
                    AND USER_PASSWORD = '${ userPwd }' 
                    AND USE_YN = 'Y'
                `
            try {
                const client = await DB.MysqlConn.getInstance.connect();
                return await client.query(query)
            } catch (e) {
                throw new Error(e)
            }

        }
    }

}
