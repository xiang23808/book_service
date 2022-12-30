import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
  @ApiProperty()
  username: string;
}
