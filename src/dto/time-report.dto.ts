import {IsDateString, IsInt, IsOptional, IsPositive, IsString, MaxLength} from 'class-validator';

export class TimeReportDto {

  @IsOptional()
  @IsInt()
  @IsPositive()
  public id?: number;

  @IsDateString()
  public startDate: string;

  @IsDateString()
  public endDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;
}
