import {Injectable, NotFoundException} from '@nestjs/common';
import {TimeReportRepository} from '../repository/time-report.repository';
import {TimeReport} from '../entity/time-report';
import {DeleteResult} from 'typeorm';
import {TimeReportUpdateModel} from '../model/time-report-update.model';

@Injectable()
export class TimeReportService {

  constructor(private readonly timeReportRepository: TimeReportRepository) {}

  public async getTimeReportById(id: number): Promise<TimeReport> {
    try {
      return await this.timeReportRepository.findOneOrFail(id);
    } catch (exception) {
      throw new NotFoundException(`Time report with id=${id} not found`);
    }
  }

  public async createTimeReport(timeReport: TimeReport): Promise<TimeReport> {
    return await this.timeReportRepository.save(timeReport);
  }

  public async updateTimeReport(id: number, timeReportUpdateModel: TimeReportUpdateModel): Promise<TimeReport> {
    let existingTimeReport: TimeReport;

    try {
      existingTimeReport = await this.timeReportRepository.findOneOrFail(id);
    } catch (exception) {
      throw new NotFoundException(`Time report with id=${id} not found`);
    }

    existingTimeReport = {
      ...existingTimeReport,
      ...timeReportUpdateModel,
    };

    return await this.timeReportRepository.save(existingTimeReport);
  }

  public async deleteTimeReport(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.timeReportRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Time report with id=${id} not found`);
    }
  }
}
