import {IsArray, IsEnum, IsOptional, IsString, Max} from 'class-validator';
import {ActivityTimeReport} from './activity-time-report';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ActivityType} from '../enum/activity-type';

@Entity()
export class Activity {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @IsString()
  @Max(70)
  public name: string;

  @Column()
  @IsEnum(ActivityType)
  public activityType: ActivityType;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Max(200)
  public description?: string;

  @IsArray()
  @OneToMany(
    type => ActivityTimeReport,
    activityTimeReport => activityTimeReport.activity,
  )
  public activityTimeReports?: ActivityTimeReport[];
}
