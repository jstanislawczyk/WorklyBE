import {Test, TestingModule} from '@nestjs/testing';
import {TimeReport } from '../entity/time-report';
import {TimeReportFixture} from '../../test/fixture/time-report.fixture';
import {TimeReportDtoFixture} from '../../test/fixture/time-report-dto.fixture';
import {TimeReportDto} from '../dto/time-report.dto';
import {TimeReportController} from './time-report.controller';
import {TimeReportService} from '../service/time-report.service';
import {TimeReportRepository} from '../repository/time-report.repository';
import SpyInstance = jest.SpyInstance;
import { TimeReportUpdateModel } from '../model/time-report-update.model';
import { TimeReportUpdateModelFixture } from '../../test/fixture/time-report-update-model.fixture';
import { TimeReportUpdateDto } from '../dto/time-report-update.dto';
import { TimeReportUpdateDtoFixture } from '../../test/fixture/time-report-update-dto.fixture';

describe('TimeReportController', () => {
  let timeReportController: TimeReportController;
  let timeReportService: TimeReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeReportController],
      providers: [TimeReportService, TimeReportRepository],
    }).compile();

    timeReportController = module.get<TimeReportController>(TimeReportController);
    timeReportService = module.get<TimeReportService>(TimeReportService);
  });

  describe('getTimeReportById', () => {
    it('should return time report', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const expectedTimeReportDto: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithOptionalProperties();

      const getTimeReportByIdSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'getTimeReportById')
        .mockImplementation(async () => timeReport);

      // Act
      const result: Promise<TimeReportDto> = timeReportController.getTimeReportById(timeReport.id);

      // Assert
      await expect(result).resolves.toEqual(expectedTimeReportDto);
      expect(getTimeReportByIdSpy).toHaveBeenCalledWith(timeReport.id);
    });

    it(`should throw error if time report doesn't exist`, async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const getTimeReportByIdSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'getTimeReportById')
        .mockImplementation(async () => {
          throw new Error(`Time report with id=${timeReport.id} not found`);
        });

      // Act
      const result: Promise<TimeReportDto> = timeReportController.getTimeReportById(timeReport.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${timeReport.id} not found`));
      expect(getTimeReportByIdSpy).toHaveBeenCalledWith(timeReport.id);
    });
  });

  describe('updateTimeReport', () => {
    it('should update time report for activity', async () => {
      // Arrange
      const existingTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const timeReportUpdateModel: TimeReportUpdateModel = TimeReportUpdateModelFixture.getTimeReportUpdateModel();
      const timeReportUpdateDto: TimeReportUpdateDto = TimeReportUpdateDtoFixture.getTimeReportUpdateDto();
      const updatedTimeReport: TimeReport = {
        ...existingTimeReport,
        ...timeReportUpdateModel,
      };
      const updatedTimeReportDto: TimeReportDto = {
        ...TimeReportDtoFixture.getTimeReportDtoWithOptionalProperties(),
        startDate: new Date(10000).toISOString(),
        endDate: new Date(20000).toISOString(),
        description: 'Updated test description',
      };

      const updateTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'updateTimeReport')
        .mockImplementation(async () => updatedTimeReport);

      // Act
      const result: Promise<TimeReportDto> = timeReportController.updateTimeReport(existingTimeReport.id, timeReportUpdateDto);

      // Assert
      await expect(result).resolves.toEqual(updatedTimeReportDto);
      expect(updateTimeReportSpy).toHaveBeenCalledWith(existingTimeReport.id, timeReportUpdateModel);
    });

    it(`should throw exception if service throws an exception`, async () => {
      // Arrange
      const existingTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const timeReportUpdateModel: TimeReportUpdateModel = TimeReportUpdateModelFixture.getTimeReportUpdateModel();
      const timeReportUpdateDto: TimeReportUpdateDto = TimeReportUpdateDtoFixture.getTimeReportUpdateDto();

      const updateTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'updateTimeReport')
        .mockImplementation(async () => {
          throw new Error(`Time report with id=${existingTimeReport.id} not found`);
        });

      // Act
      const result: Promise<TimeReportDto> = timeReportController.updateTimeReport(existingTimeReport.id, timeReportUpdateDto);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${existingTimeReport.id} not found`));
      expect(updateTimeReportSpy).toHaveBeenCalledWith(existingTimeReport.id, timeReportUpdateModel);
    });
  });

  describe('deleteTimeReport', () => {
    it('should delete time report', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const deleteTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'deleteTimeReport');

      // Act
      const result: Promise<void> = timeReportController.deleteTimeReport(timeReport.id);

      // Assert
      await expect(result).resolves;
      expect(deleteTimeReportSpy).toHaveBeenCalledWith(timeReport.id);
    });

    it('should not find time report for delete', async () => {
      // Arrange
      const notExistingId: number = 111;

      const deleteTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'deleteTimeReport')
        .mockImplementation(async () => {
          throw new Error(`Time report with id=${notExistingId} not found`)
        });

      // Act
      const result: Promise<void> = timeReportController.deleteTimeReport(notExistingId);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${notExistingId} not found`));
      expect(deleteTimeReportSpy).toHaveBeenCalledWith(notExistingId);
    });
  });
});
