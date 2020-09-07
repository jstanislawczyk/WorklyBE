import {EntityRepository, Repository} from 'typeorm';
import {TimeReport} from '../entity/time-report';

@EntityRepository(TimeReport)
export class TimeReportRepository extends Repository<TimeReport> {

}
