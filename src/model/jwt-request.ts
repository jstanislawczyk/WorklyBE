import {CommonRequest} from './common-request';
import {UserTokenPayload} from './user-token-payload.model';

export class JwtRequest extends CommonRequest {

  public readonly user: UserTokenPayload;
}
