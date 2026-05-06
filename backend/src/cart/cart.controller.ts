import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('items')
  async addItem(@Request() req: any, @Body() item: { productId: string; quantity: number }) {
    return this.cartService.addItem(req.user.id, item);
  }

  @Patch('items/:productId')
  async updateItem(@Request() req: any, @Param('productId') productId: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItem(req.user.id, productId, body.quantity);
  }

  @Delete('items/:productId')
  async removeItem(@Request() req: any, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.id, productId);
  }
}
