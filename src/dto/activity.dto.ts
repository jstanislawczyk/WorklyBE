import {IsArray, IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength} from 'class-validator';
import {ActivityType} from '../enum/activity-type';
import {TimeReport} from '../entity/time-report';

export class ActivityDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  public id?: number;

  @IsString()
  @MaxLength(70)
  public name: string;

  @IsEnum(ActivityType)
  public activityType: ActivityType;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;

  @IsOptional()
  @IsArray()
  public activityTimeReports?: TimeReport[];
}
