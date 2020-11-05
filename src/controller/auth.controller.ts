import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {JwtAuthGuard} from '../security/jwt.guard';
import {AuthService} from '../service/auth.service';
import {LocalAuthGuard} from '../security/local.guard';
import {TokenResponse} from '../model/token-response.model';
import {LocalRequest} from '../model/local-request';
import {UserTokenPayload} from '../model/user-token-payload.model';
import {JwtRequest} from '../model/jwt-request';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {

  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() request: LocalRequest): Promise<TokenResponse> {
    return this.authService.getUserToken(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() request: JwtRequest): UserTokenPayload {
    return request.user;
  }
}
