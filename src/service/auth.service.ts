import {Injectable} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtService } from '@nestjs/jwt';
import {User} from '../entity/user';
import {TokenResponse} from '../model/token-response.model';
import {UserTokenPayload} from '../model/user-token-payload.model';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {

  }

  public async validateUser(email: string, password: string): Promise<User | undefined> {
    return this.usersService.findByEmailAndPassword(email, password);
  }

  public async getUserToken(user: User): Promise<TokenResponse> {
    const tokenPayload: UserTokenPayload = {
      email: user.email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(tokenPayload),
    };
  }
}
