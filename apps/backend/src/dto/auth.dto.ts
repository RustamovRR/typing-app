import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class UserReturnDto implements Omit<User, 'password'> {
  id: number;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  access_token: string;
}
