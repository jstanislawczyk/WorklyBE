import {Body, Controller, Delete, Get, HttpCode, Param, Post} from '@nestjs/common';
import {ActivityService} from '../../service/activity.service';
import {Logger} from '@nestjs/common';
import {Activity} from '../../entity/activity';
import {ActivityDto} from '../../dto/activity.dto';
import {ActivityDtoMapper} from '../../mapper/activity.dto-mapper';

@Controller('activity')
export class ActivityController {

  constructor(private readonly activityService: ActivityService) {}

  @Get()
  public async getAllActivities(): Promise<ActivityDto[]> {
    Logger.log('Fetching all activities');

    const activities: Activity[] = await this.activityService.getAllActivities();

    return ActivityDtoMapper.toDtoList(activities);
  }

  @Get(':id')
  public async getActivityById(@Param('id') id: number): Promise<Activity> {
    Logger.log(`Fetching activity with id=${id}`);

    const activity: Activity = await this.activityService.getActivityById(id);

    return ActivityDtoMapper.toDto(activity);
  }

  @Post()
  @HttpCode(201)
  public async createActivity(@Body() activityDto: ActivityDto): Promise<Activity> {
    Logger.log(`Saving new activity with name=${activityDto.name}`);

    const activity: Activity = ActivityDtoMapper.toEntity(activityDto);
    const savedActivity: Activity = await this.activityService.createActivity(activity);

    return ActivityDtoMapper.toDto(savedActivity);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteActivity(@Param('id') id: number): Promise<void> {
    Logger.log(`Deleting activity with id=${id}`);

    await this.activityService.deleteActivity(id);
  }
}
