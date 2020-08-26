import {IsDate, IsInt, IsOptional, IsPositive, IsString, Max} from 'class-validator';
import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Activity} from './activity';

@Entity()
export class ActivityTimeReport {

  @PrimaryGeneratedColumn()
  public id?: number;

  @IsDate()
  public startDate: Date;

  @IsDate()
  public endDate: Date;

  @IsInt()
  @IsPositive()
  public timeSpentInMinutes: number;

  @IsOptional()
  @IsString()
  @Max(200)
  public description: string;

  @ManyToOne(
    type => Activity,
    activity => activity.activityTimeReports,
  )
  activity: Activity;
}
