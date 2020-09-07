import {IsDateString, IsOptional, IsString, MaxLength} from 'class-validator';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Activity} from './activity';

@Entity()
export class TimeReport {

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @IsDateString()
  public startDate: Date;

  @Column()
  @IsDateString()
  public endDate: Date;

  @Column()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;

  @ManyToOne(
    () => Activity,
    activity => activity.activityTimeReports,
  )
  activity?: Activity;
}
