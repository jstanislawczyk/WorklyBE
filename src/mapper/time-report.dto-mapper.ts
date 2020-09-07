import {TimeReport} from '../entity/time-report';
import {TimeReportDto} from '../dto/time-report.dto';

export class TimeReportDtoMapper {

  public static toDtoList(timeReports: TimeReport[]): TimeReportDto[] {
    return timeReports.map((timeReport: TimeReport) => this.toDto(timeReport));
  }

  public static toEntity(timeReportDto: TimeReportDto): TimeReport {
    return {
      startDate: new Date(timeReportDto.startDate),
      endDate: new Date(timeReportDto.endDate),
      description: timeReportDto.description,
    }
  }

  public static toDto(timeReport: TimeReport): TimeReportDto {
    return {
      id: timeReport.id,
      startDate: timeReport.startDate.toISOString(),
      endDate: timeReport.endDate.toISOString(),
      description: timeReport.description,
    }
  }
}
