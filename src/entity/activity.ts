import {IsArray, IsEnum, IsInt, IsOptional, IsPositive, IsString, MaxLength} from 'class-validator';
import {TimeReport} from './time-report';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ActivityType} from '../enum/activity-type';

@Entity()
export class Activity {

  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsInt()
  @IsPositive()
  public id?: number;

  @Column()
  @IsString()
  @MaxLength(70)
  public name: string;

  @Column()
  @IsEnum(ActivityType)
  public activityType: ActivityType;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;

  @OneToMany(
    () => TimeReport,
    activityTimeReport => activityTimeReport.activity,
  )
  @IsOptional()
  @IsArray()
  public activityTimeReports?: TimeReport[];
}
