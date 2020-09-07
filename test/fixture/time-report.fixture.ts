import {TimeReport} from '../../src/entity/time-report';
import {ActivityFixture} from './activity.fixture';

export class TimeReportFixture {

  public static getTimeReportEntity(): TimeReport {
    return {
      startDate: new Date(1000),
      endDate: new Date(2000),
    }
  }

  public static getTimeReportEntityWithoutId(): TimeReport {
    return {
      ...TimeReportFixture.getTimeReportEntity(),
      description: 'Test description',
    }
  }

  public static getTimeReportEntityWithOptionalProperties(): TimeReport {
    return {
      ...TimeReportFixture.getTimeReportEntity(),
      id: 1,
      description: 'Test description',
    }
  }

  public static getTimeReportEntityWithIdAndActivity(): TimeReport {
    return {
      ...TimeReportFixture.getTimeReportEntity(),
      description: 'Test description',
      activity: ActivityFixture.getActivityEntityWithOptionalProperties(),
    }
  }

  public static getTimeReportEntityWithActivity(): TimeReport {
    return {
      ...TimeReportFixture.getTimeReportEntity(),
      id: 1,
      description: 'Test description',
      activity: ActivityFixture.getActivityEntityWithOptionalProperties(),
    }
  }
}