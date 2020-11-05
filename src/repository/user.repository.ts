import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entity/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async findByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    return this.findOne({
      email,
      password,
    });
  }
}
