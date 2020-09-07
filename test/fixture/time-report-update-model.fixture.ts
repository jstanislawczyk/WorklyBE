import {TimeReportUpdateModel} from '../../src/model/time-report-update.model';

export class TimeReportUpdateModelFixture {

  public static getTimeReportUpdateModel(): TimeReportUpdateModel {
    return {
      startDate: new Date(10000),
      endDate: new Date(20000),
      description: 'Updated test description',
    }
  }
}
