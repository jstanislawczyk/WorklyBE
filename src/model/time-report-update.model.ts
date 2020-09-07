import {IsDateString, IsOptional, IsString, MaxLength} from 'class-validator';

export class TimeReportUpdateModel {

  @IsOptional()
  @IsDateString()
  public startDate?: Date;

  @IsOptional()
  @IsDateString()
  public endDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;
}
