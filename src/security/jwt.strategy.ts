import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import configuration from '../config/configuration';
import {UserTokenPayload} from '../model/user-token-payload.model';
import {UserDto} from '../dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().security.jwt.secret,
    });
  }

  public validate(payload: UserTokenPayload): UserDto {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
