import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserInfo } from '../interface';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async canActivate(
        context: ExecutionContext
    ) : Promise<boolean> {
        const request : Request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            throw new UnauthorizedException();
        }

        const token : string = request.headers.authorization!.replace("Bearer ", "");
        
        try {
            const userInfo : UserInfo = await this.jwtService.verifyAsync(token);

            request['user'] = userInfo;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}