import {EntityRepository, Repository} from 'typeorm';
import {Activity} from '../entity/activity';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {

  public async findByName(name: string): Promise<Activity> {
    return this.findOne({ name });
  }
}
