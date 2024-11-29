import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { };

  async canActivate(
    context: ExecutionContext,): Promise<boolean> {

    //This why I want context object give me info about the incoming request and execution enviroment 
    const request = context.switchToHttp().getRequest();
    console.log('request from auth guard: ', request.headers.authorization);

    const token =  this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED)
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),//For verifying the token sign
      });
      request.user = payload; //gives back the user data extracted from the token
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];//coalescencia nula (??) Si el resultado de la expresión anterior es undefined, devuelve un array vacío ([]) para evitar errores.
    return type === "Bearer" ? token : undefined;
  }
}

