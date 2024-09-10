import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  categories: string;
}
