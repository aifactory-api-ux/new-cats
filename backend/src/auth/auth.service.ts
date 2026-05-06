import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { AuthResponseDto, UserDto } from './dto/auth-response.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: UserRegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = this.hashPassword(dto.password);
    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
    });

    const accessToken = this.generateToken(user.id);
    return {
      accessToken,
      user: this.toUserDto(user),
    };
  }

  async login(dto: UserLoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordHash = this.hashPassword(dto.password);
    if (user.passwordHash !== passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user.id);
    return {
      accessToken,
      user: this.toUserDto(user),
    };
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private generateToken(userId: string): string {
    return this.jwtService.sign({ sub: userId });
  }

  private toUserDto(user: any): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
