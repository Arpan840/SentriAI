import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { messages } from 'src/messages';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: Response, next: NextFunction) {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: messages.UnAuthorized });
    }
    token = token.replace('Bearer ', '');
    token = token.trim();
    try {
      const userInfo = this.jwtService.verify(token);
      req.user = userInfo; // attach user
      next(); // just call next()
    } catch (error: any) {
      return res
        .status(401)
        .json({ message: error.message || messages.UnAuthorized });
    }
  }
}
