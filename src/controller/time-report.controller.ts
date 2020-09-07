import {Body, Controller, Delete, Get, HttpCode, Param, Patch} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {TimeReportService} from '../service/time-report.service';
import {TimeReportDtoMapper} from '../mapper/time-report.dto-mapper';
import {TimeReportDto} from '../dto/time-report.dto';
import {TimeReport} from '../entity/time-report';
import { TimeReportUpdateDto } from '../dto/time-report-update.dto';
import { TimeReportUpdateDtoMapper } from '../mapper/time-report-update.dto-mapper';
import { TimeReportUpdateModel } from '../model/time-report-update.model';

@Controller('time-report')
export class TimeReportController {

  constructor(private readonly timeReportService: TimeReportService) {}

  @Get(':id')
  @HttpCode(201)
  public async getTimeReportById(@Param('id') id: number): Promise<TimeReportDto> {
    Logger.log(`Fetching time report with id=${id}`);

    const timeReport: TimeReport = await this.timeReportService.getTimeReportById(id);

    return TimeReportDtoMapper.toDto(timeReport);
  }

  @Patch(':id')
  public async updateTimeReport(
    @Param('id') id: number,
    @Body() timeReportDto: TimeReportUpdateDto,
  ): Promise<TimeReportDto> {
    Logger.log(`Updating time report with id=${id}`);

    const timeReportBodyToUpdate: TimeReportUpdateModel = TimeReportUpdateDtoMapper.toModel(timeReportDto);
    const updatedTimeReport: TimeReport = await this.timeReportService.updateTimeReport(id, timeReportBodyToUpdate);

    return TimeReportDtoMapper.toDto(updatedTimeReport);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteTimeReport(@Param('id') id: number): Promise<void> {
    Logger.log(`Deleting time report with id=${id}`);

    await this.timeReportService.deleteTimeReport(id);
  }
}
