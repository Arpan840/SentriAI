import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { messages } from 'src/messages';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SecurityUtil } from 'src/helper.ts/security.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async signIn({ email, password }: { email: string; password: string }) {
    try {
      const encryptionKey = SecurityUtil.generateEncryptionKey();
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
         throw new BadRequestException(messages.EmailAlreadyExists);
      }
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.saltRound) || 10,
      );
      if (!hashedPassword) {
        return { message: messages.SignInFailed, status: 500 };
      }
      const user = await this.userRepo.save({
        email,
        password: hashedPassword,
        encryptionKey: SecurityUtil.wrapKey(encryptionKey),
      });
      return { user, message: messages.SignInSuccessful };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new BadRequestException(messages.UserNotFound);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException(messages.InvalidCredentials);
      }
      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });
      return { token, message: 'Login successful' };
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'encryptionKey','createdAt'],
    });
    return user || null;
  }
}
