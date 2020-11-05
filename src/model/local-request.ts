import {User} from '../entity/user';
import {CommonRequest} from './common-request';

export class LocalRequest extends CommonRequest {

  public readonly user: User;
}
