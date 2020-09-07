import {IsDateString, IsOptional, IsString, MaxLength} from 'class-validator';

export class TimeReportUpdateDto {

  @IsOptional()
  @IsDateString()
  public startDate?: string;

  @IsOptional()
  @IsDateString()
  public endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  public description?: string;
}
