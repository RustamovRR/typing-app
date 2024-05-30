import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserAuthDto, UserReturnDto } from 'src/dto';
import { getErrorMessage } from 'src/utils';
import { LanguageType } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserReturnDto, 'access_token'>> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    loginDto: UserAuthDto,
    lang: LanguageType,
  ): Promise<UserReturnDto> {
    const user = await this.userService.findOne(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({
        status: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        ...getErrorMessage('USER_NOT_FOUND', lang),
      });
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        status: false,
        statusCode: HttpStatus.AMBIGUOUS,
        ...getErrorMessage('INVALID_CREDENTIALS', lang),
      });
    }

    const payload = { sub: user.id, email: user.email };
    const { password, ...result } = user;

    return {
      ...result,
      access_token: await this.jwtService.signAsync(payload),
    };

    // throw new HttpException(
    //   {
    //     status: false,
    //     statusCode: HttpStatus.UNAUTHORIZED,
    //     ...getErrorMessage('LOGIN_PROBLEM', lang),
    //   },
    //   HttpStatus.UNAUTHORIZED,
    // );
  }

  async register(registerDto: UserAuthDto, lang: LanguageType): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      const user = await this.userService.createUser({
        ...registerDto,
        password: hashedPassword,
      });

      const { password, ...result } = user;
      const payload = { sub: user.id, email: user.email };

      return {
        ...result,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      if (
        error.code === 'P2002' &&
        error.meta &&
        error.meta.target.includes('email')
      ) {
        throw new ConflictException({
          status: false,
          statusCode: HttpStatus.CONFLICT,
          ...getErrorMessage('USER_ALREADY_EXISTS', lang),
        });
      } else {
        throw new HttpException(
          {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            ...getErrorMessage('REGISTRATION_PROBLEM', lang),
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
