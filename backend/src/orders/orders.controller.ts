import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Request() req: any, @Body() body: { cartId: string }) {
    return this.ordersService.create(req.user.id, body.cartId);
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }
}
