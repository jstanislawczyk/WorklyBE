import {IsArray, IsEnum, IsOptional, IsString, Max} from 'class-validator';
import {ActivityType} from '../enum/activity-type';
import {ActivityTimeReport} from '../entity/activity-time-report';
import {Column} from 'typeorm';

export class ActivityDto {

  public id?: number;

  @Column()
  @IsString()
  @Max(70)
  public name: string;

  @IsEnum(ActivityType)
  public activityType: ActivityType;

  @IsOptional()
  @IsString()
  @Max(200)
  public description?: string;

  @IsArray()
  public activityTimeReports?: ActivityTimeReport[];
}
