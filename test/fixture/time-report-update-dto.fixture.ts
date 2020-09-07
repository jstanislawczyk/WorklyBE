import {TimeReportUpdateDto} from '../../src/dto/time-report-update.dto';

export class TimeReportUpdateDtoFixture {

  public static getTimeReportUpdateDto(): TimeReportUpdateDto {
    return {
      startDate: new Date(10000).toISOString(),
      endDate: new Date(20000).toISOString(),
      description: 'Updated test description',
    }
  }

  public static getTimeReportUpdateDtoWitDescriptionOnly(): TimeReportUpdateDto {
    return {
      description: 'Updated test description',
    }
  }
}
