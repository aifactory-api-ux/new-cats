import { IsString, IsNumber, IsPositive, MinLength, Min } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(1)
  imageUrl: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @MinLength(1)
  category: string;
}
