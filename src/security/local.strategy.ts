import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from '../service/auth.service';
import {Strategy} from 'passport-local';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from '../entity/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
