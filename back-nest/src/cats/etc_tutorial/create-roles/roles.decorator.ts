import {SetMetadata} from "@nestjs/common";

export const ROLE = (...roles: string[]) => SetMetadata('ROLE',ROLE);