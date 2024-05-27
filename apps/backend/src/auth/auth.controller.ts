import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /// GOOGLE AUTH
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const jwt = this.authService.generateJwt(req.user);
    return { message: 'User infromation from Google', user: req.user, jwt };
  }

  /// GITHUB AUTH
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req) {
    const jwt = this.authService.generateJwt(req.user);
    return { message: 'User infromation from Github', user: req.user, jwt };
  }

  /// LINKEDIN AUTH
  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth(@Req() req) {}

  @Get('linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuthRedirect(@Req() req) {
    const jwt = this.authService.generateJwt(req.user);
    return { message: 'User infromation from Linkedin', user: req.user, jwt };
  }

  /// YANDEX AUTH
  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuth(@Req() req) {}

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthRedirect(@Req() req) {
    const jwt = this.authService.generateJwt(req.user);
    return { message: 'User infromation from Yandex', user: req.user, jwt };
  }

  /// FACEBOOK AUTH
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req) {
    const jwt = this.authService.generateJwt(req.user);
    return { message: 'User infromation from Facebook', user: req.user, jwt };
  }
}
