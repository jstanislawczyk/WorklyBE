import {Injectable} from '@nestjs/common';
import {TimeReport} from '../entity/time-report';
import {ActivityService} from '../service/activity.service';
import {TimeReportService} from '../service/time-report.service';

@Injectable()
export class ActivityTimeReportFacade {

  constructor(
    private readonly activityService: ActivityService,
    private readonly timeReportService: TimeReportService,
  ) {}

  public async createTimeReportForActivity(activityId: number, timeReport: TimeReport): Promise<TimeReport> {
    timeReport.activity = await this.activityService.getActivityById(activityId);

    return await this.timeReportService.createTimeReport(timeReport);
  }
}
