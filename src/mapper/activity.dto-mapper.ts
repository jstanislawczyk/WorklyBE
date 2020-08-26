import {ActivityDto} from '../dto/activity.dto';
import {Activity} from '../entity/activity';

export class ActivityDtoMapper {

  public static toDtoList(activities: Activity[]): ActivityDto[] {
    return activities.map((activity: Activity) => this.toDto(activity));
  }

  public static toEntity(activityDto: ActivityDto): Activity {
    return {
      activityType: activityDto.activityType,
      description: activityDto.description,
      name: activityDto.name,
    }
  }

  public static toDto(activity: Activity): ActivityDto {
    return {
      id: activity.id,
      activityType: activity.activityType,
      description: activity.description,
      name: activity.name,
    }
  }
}
