import {TimeReportDto} from '../../src/dto/time-report.dto';
import {TimeReport} from '../../src/entity/time-report';
import {ActivityDtoFixture} from './activity-dto.fixture';
import {ActivityFixture} from './activity.fixture';

export class TimeReportDtoFixture {

  public static getTimeReportDto(): TimeReportDto {
    return {
      startDate: new Date(1000).toISOString(),
      endDate: new Date(2000).toISOString(),
    }
  }

  public static getTimeReportDtoWithoutId(): TimeReportDto {
    return {
      ...TimeReportDtoFixture.getTimeReportDto(),
      description: 'Test description',
    }
  }

  public static getTimeReportDtoWithOptionalProperties(): TimeReportDto {
    return {
      ...TimeReportDtoFixture.getTimeReportDto(),
      id: 1,
      description: 'Test description',
    }
  }
}