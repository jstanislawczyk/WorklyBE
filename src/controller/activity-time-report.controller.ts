import {Body, Controller, Post, HttpCode, Param} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {TimeReport} from '../entity/time-report';
import {ActivityTimeReportFacade} from '../facade/activity-time-report.facade';
import {TimeReportDto} from '../dto/time-report.dto';
import {TimeReportDtoMapper} from '../mapper/time-report.dto-mapper';

@Controller('activity')
export class ActivityTimeReportController {

  constructor(private readonly activityTimeReportFacade: ActivityTimeReportFacade) {}

  @Post(':activityId/time-report')
  @HttpCode(201)
  public async createActivityTimeReport(
    @Param('activityId') activityId: number,
    @Body() timeReportDto: TimeReportDto,
  ): Promise<TimeReportDto> {
    Logger.log(`Saving new time report for activity with id=${activityId}`);

    const timeReport: TimeReport = TimeReportDtoMapper.toEntity(timeReportDto);
    const savedTimeReport: TimeReport = await this.activityTimeReportFacade.createTimeReportForActivity(activityId, timeReport);

    return TimeReportDtoMapper.toDto(savedTimeReport);
  }
}
