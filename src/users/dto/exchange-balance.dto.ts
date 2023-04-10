import { IsInt, IsNotEmpty } from 'class-validator';

export class ExchangeBalanceDto {
  @IsNotEmpty()
  @IsInt()
  integral: number;
}
