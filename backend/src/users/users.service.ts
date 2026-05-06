import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { generateId, formatDate } from '../shared/utils';

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  private users: Map<string, UserRecord> = new Map();

  async create(data: { email: string; name: string; passwordHash: string }): Promise<UserRecord> {
    const id = generateId();
    const now = formatDate(new Date());
    const user: UserRecord = {
      id,
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    return this.users.get(id) || null;
  }

  async toDto(user: UserRecord): Promise<UserDto> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
