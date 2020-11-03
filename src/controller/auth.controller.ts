import {Controller, Request, Post, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '../security/auth.guard';
import {AuthService} from '../service/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {

  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Record<string, any>): Promise<any> {
    return this.authService.login(req.user);
  }

}
