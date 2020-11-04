import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import configuration from '../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().security.jwt.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
