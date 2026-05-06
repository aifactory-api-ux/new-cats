import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return { status: 'ok', service: 'backend', version: '1.0.0' };
  }
}
