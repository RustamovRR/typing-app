import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAuthDto } from 'src/dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUser(registerDto: UserAuthDto): Promise<User | undefined> {
    return this.prismaService.user.create({
      data: {
        ...registerDto,
        username: registerDto.email.split('@')[0],
      } as User,
    });
  }
}
