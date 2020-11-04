import {Injectable} from '@nestjs/common';
import {User} from '../entity/User';
import {UserRepository} from '../repository/user.repository';

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UserRepository) {

  }

  public async findByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
    return this.userRepository.findByEmailAndPassword(email, password);
  }
}
