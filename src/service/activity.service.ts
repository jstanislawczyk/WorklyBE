import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ActivityRepository} from '../repository/activity.repository';
import {Activity} from '../entity/activity';
import {DeleteResult} from 'typeorm';

@Injectable()
export class ActivityService {

  constructor(private activityRepository: ActivityRepository) {}

  public async getAllActivities(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  public async getActivityById(id: number): Promise<Activity> {
      try {
        return await this.activityRepository.findOneOrFail(id);
      } catch (exception) {
        throw new NotFoundException(`Activity with id=${id} not found`);
      }
  }

  public async createActivity(activity: Activity): Promise<Activity> {
    const existingActivity: Activity = await this.activityRepository.findByName(activity.name);

    if (existingActivity) {
      throw new BadRequestException(`Activity with name=${activity.name} already exists`);
    } else {
      return this.activityRepository.save(activity);
    }
  }

  public async deleteActivity(id: number): Promise<void> {
    const deleteResult: DeleteResult = await this.activityRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Activity with id=${id} not found`);
    }
  }
}
