import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {JwtAuthGuard} from '../security/jwt.guard';
import {AuthService} from '../service/auth.service';
import {LocalAuthGuard} from '../security/local.guard';
import {User} from '../entity/User';
import {TokenResponse} from '../model/token-response.model';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {

  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() request): Promise<TokenResponse> {
    return this.authService.getUserToken(request.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }
}
