import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRegisterDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestType, Response as ResponseType } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: UserRegisterDto, @Request() req: RequestType) {
    const lang = req.headers['accept-language'] === 'uz' ? 'uz' : 'en';
    return this.authService.register(registerDto, lang);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: UserRegisterDto,
    @Request() req: RequestType,
    @Response() res: ResponseType,
  ) {
    const lang = req.headers['accept-language'] === 'uz' ? 'uz' : 'en';
    const result = await this.authService.login(loginDto, lang);
    return res.status(HttpStatus.OK).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
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
