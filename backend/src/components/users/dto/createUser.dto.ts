import {
  IsNotEmpty, MinLength, IsString, IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly user_one_signal_id: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly password: string;
}
