import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserAuthDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { COOKIE_EXPIRY_DATE } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: UserAuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const lang = req.headers['accept-language'] === 'uz' ? 'uz' : 'en';
    const { access_token } = await this.authService.login(loginDto, lang);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_DATE,
    });
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Post('register')
  async register(
    @Body() registerDto: UserAuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const lang = req.headers['accept-language'] === 'uz' ? 'uz' : 'en';
    const { access_token, ...result } = await this.authService.register(
      registerDto,
      lang,
    );
    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: COOKIE_EXPIRY_DATE,
    });
    return res.status(HttpStatus.CREATED).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  /// GOOGLE AUTH
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return { message: 'User infromation from Google', user: req.user };
  }

  /// GITHUB AUTH
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    return { message: 'User infromation from Github', user: req.user };
  }

  /// LINKEDIN AUTH
  // @Get('linkedin')
  // @UseGuards(AuthGuard('linkedin'))
  // async linkedinAuth(@Req() req) {}

  // @Get('linkedin/callback')
  // @UseGuards(AuthGuard('linkedin'))
  // async linkedinAuthRedirect(@Req() req) {
  //   return { message: 'User infromation from Linkedin', user: req.user };
  // }

  // /// YANDEX AUTH
  // @Get('yandex')
  // @UseGuards(AuthGuard('yandex'))
  // async yandexAuth(@Req() req) {}

  // @Get('yandex/callback')
  // @UseGuards(AuthGuard('yandex'))
  // async yandexAuthRedirect(@Req() req) {
  //   return { message: 'User infromation from Yandex', user: req.user };
  // }

  // /// FACEBOOK AUTH
  // @Get('facebook')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookAuth(@Req() req) {}

  // @Get('facebook/callback')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookAuthRedirect(@Req() req) {
  //   return { message: 'User infromation from Facebook', user: req.user };
  // }
}
