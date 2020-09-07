import {Activity} from '../../src/entity/activity';
import {ActivityType} from '../../src/enum/activity-type';

export class ActivityFixture {

  public static getActivityEntity(): Activity {
    return {
      name: 'TestName',
      activityType: ActivityType.PROJECT,
    }
  }

  public static getActivityEntityWithoutId(): Activity {
    return {
      ...ActivityFixture.getActivityEntity(),
      description: 'Test description',
    }
  }

  public static getActivityEntityWithOptionalProperties(): Activity {
    return {
      ...ActivityFixture.getActivityEntity(),
      id: 1,
      description: 'Test description',
    }
  }
}