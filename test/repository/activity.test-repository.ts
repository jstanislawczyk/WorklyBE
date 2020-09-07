import {Connection, getConnection, Repository} from 'typeorm';
import {Activity} from '../../src/entity/activity';
import configuration from '../../src/config/configuration';

export class ActivityTestRepository {

  private connection: Connection;
  private activityRepository: Repository<Activity>;

  public async init(): Promise<void> {
    this.connection = getConnection(configuration().database.connectionName);
    this.activityRepository = this.connection.getRepository(Activity);
  }

  public async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  public async findById(id: number): Promise<Activity> {
    return this.activityRepository.findOne({
      id,
    });
  }

  public async save(activity: Activity): Promise<Activity> {
    return this.activityRepository.save(activity);
  }

  public async saveAll(activities: Activity[]): Promise<Activity[]> {
    return this.activityRepository.save(activities);
  }

  public async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Activity)
      .where("id > 0")
      .execute();
  }
}
