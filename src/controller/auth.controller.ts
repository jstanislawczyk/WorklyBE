import {Controller, Request, Post, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '../security/auth.guard';
import {User} from '../entity/User';

@Controller('auth')
export class AuthController {

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Record<string, any>): Promise<User> {
    return req.user;
  }

}
