import {TimeReportUpdateDto} from '../dto/time-report-update.dto';
import {TimeReportUpdateModel} from '../model/time-report-update.model';

export class TimeReportUpdateDtoMapper {

  public static toModel(timeReportUpdateDto: TimeReportUpdateDto): TimeReportUpdateModel {
    const timeReportUpdateModel: TimeReportUpdateModel = new TimeReportUpdateModel();

    if (timeReportUpdateDto.startDate !== undefined) {
      timeReportUpdateModel.startDate = new Date(timeReportUpdateDto.startDate);
    }

    if (timeReportUpdateDto.endDate !== undefined) {
      timeReportUpdateModel.endDate = new Date(timeReportUpdateDto.endDate);
    }

    if (timeReportUpdateDto.description !== undefined) {
      timeReportUpdateModel.description = timeReportUpdateDto.description;
    }

    return timeReportUpdateModel;
  }
}
