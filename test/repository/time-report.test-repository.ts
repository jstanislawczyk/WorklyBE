import {Connection, getConnection, Repository} from 'typeorm';
import configuration from '../../src/config/configuration';
import {TimeReport} from '../../src/entity/time-report';

export class TimeReportTestRepository {

  private connection: Connection;
  private timeReportRepository: Repository<TimeReport>;

  public async init(): Promise<void> {
    this.connection = getConnection(configuration().database.connectionName);
    this.timeReportRepository = this.connection.getRepository(TimeReport);
  }

  public async save(timeReport: TimeReport): Promise<TimeReport> {
    return this.timeReportRepository.save(timeReport);
  }

  public async findById(id: number): Promise<TimeReport> {
    return this.timeReportRepository.findOne({
      id,
    });
  }

  public async deleteAll(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(TimeReport)
      .where("id > 0")
      .execute();
  }
}
