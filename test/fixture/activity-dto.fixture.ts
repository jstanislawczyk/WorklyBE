import {ActivityType} from '../../src/enum/activity-type';
import {ActivityDto} from '../../src/dto/activity.dto';

export class ActivityDtoFixture {

  public static getActivityDto(): ActivityDto {
    return {
      name: 'TestName',
      activityType: ActivityType.PROJECT,
    }
  }

  public static getActivityDtoWithOptionalProperties(): ActivityDto {
    return {
      ...ActivityDtoFixture.getActivityDto(),
      id: 1,
      description: 'Test description',
    }
  }
}