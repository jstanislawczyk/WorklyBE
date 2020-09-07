import {Test, TestingModule} from '@nestjs/testing';
import {TimeReportRepository} from '../repository/time-report.repository';
import {TimeReportService} from './time-report.service';
import {TimeReport} from '../entity/time-report';
import {TimeReportFixture} from '../../test/fixture/time-report.fixture';
import SpyInstance = jest.SpyInstance;
import {DeleteResult} from 'typeorm';
import {TimeReportUpdateModelFixture} from '../../test/fixture/time-report-update-model.fixture';
import {TimeReportUpdateModel} from '../model/time-report-update.model';

describe('TimeReportService', () => {
  let timeReportService: TimeReportService;
  let timeReportRepository: TimeReportRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeReportService, TimeReportRepository],
    }).compile();

    timeReportService = module.get<TimeReportService>(TimeReportService);
    timeReportRepository = module.get<TimeReportRepository>(TimeReportRepository);
  });

  describe('getTimeReportById', () => {
    it('should return time report', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'findOneOrFail')
        .mockImplementation(async () => timeReport);

      // Act
      const result: Promise<TimeReport> = timeReportService.getTimeReportById(timeReport.id);

      // Assert
      await expect(result).resolves.toEqual(timeReport);
      expect(findOneOrFailSpy).toHaveBeenCalledWith(timeReport.id);
    });

    it(`should throw error if activity doesn't exist`, async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'findOneOrFail')
        .mockImplementation(async () => {
          throw new Error('Not found');
        });

      // Act
      const result: Promise<TimeReport> = timeReportService.getTimeReportById(timeReport.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${timeReport.id} not found`));
      expect(findOneOrFailSpy).toHaveBeenCalledWith(timeReport.id);
    });
  });

  describe('createTimeReport', () => {
    it('should save time report for activity', async () => {
      // Arrange
      const timeReportWithActivity: TimeReport = TimeReportFixture.getTimeReportEntityWithActivity();
      const savedTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithIdAndActivity();

      const saveSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'save')
        .mockImplementation(async () => savedTimeReport);

      // Act
      const result: Promise<TimeReport> = timeReportService.createTimeReport(timeReportWithActivity);

      // Assert
      await expect(result).resolves.toEqual(savedTimeReport);
      expect(saveSpy).toHaveBeenCalledWith(timeReportWithActivity);
    });

    it('should pass exception thrown by repository', async () => {
      // Arrange
      const timeReportWithActivity: TimeReport = TimeReportFixture.getTimeReportEntityWithActivity();

      const saveSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'save')
        .mockImplementation(async () => {
          throw new Error('Repository error');
        });

      // Act
      const result: Promise<TimeReport> = timeReportService.createTimeReport(timeReportWithActivity);

      // Assert
      await expect(result).rejects.toEqual(new Error('Repository error'));
      expect(saveSpy).toHaveBeenCalledWith(timeReportWithActivity);
    });
  });

  describe('updateTimeReport', () => {
    it('should update time report for activity', async () => {
      // Arrange
      const existingTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const timeReportUpdateModel: TimeReportUpdateModel = TimeReportUpdateModelFixture.getTimeReportUpdateModel();
      const updatedTimeReport: TimeReport = {
        ...existingTimeReport,
        ...timeReportUpdateModel,
      };

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'findOneOrFail')
        .mockImplementation(async () => existingTimeReport);

      const saveSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'save')
        .mockImplementation(async () => updatedTimeReport);

      // Act
      const result: Promise<TimeReport> = timeReportService.updateTimeReport(existingTimeReport.id, timeReportUpdateModel);

      // Assert
      await expect(result).resolves.toEqual(updatedTimeReport);
      expect(findOneOrFailSpy).toHaveBeenCalledWith(existingTimeReport.id);
      expect(saveSpy).toHaveBeenCalledWith(updatedTimeReport);
    });

    it(`should throw exception if updated time report doesn't exist`, async () => {
      // Arrange
      const notExistingId: number = 111;
      const timeReportUpdateModel: TimeReportUpdateModel = TimeReportUpdateModelFixture.getTimeReportUpdateModel();

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'findOneOrFail')
        .mockImplementation(async () => {
          throw new Error('Repository error');
        });

      // Act
      const result: Promise<TimeReport> = timeReportService.updateTimeReport(notExistingId, timeReportUpdateModel);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${notExistingId} not found`));
      expect(findOneOrFailSpy).toHaveBeenCalledWith(notExistingId);
    });
  });

  describe('deleteTimeReport', () => {
    it('should delete time report', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const mockedDeleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };

      const deleteSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'delete')
        .mockImplementation(async () => mockedDeleteResult);

      // Act
      const result: Promise<void> = timeReportService.deleteTimeReport(timeReport.id);

      // Assert
      await expect(result).resolves;
      expect(deleteSpy).toHaveBeenCalledWith(timeReport.id);
    });

    it('should throw exception if delete will not affect any record', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const mockedDeleteResult: DeleteResult = {
        affected: 0,
        raw: {},
      };

      const deleteSpy: SpyInstance<any> = jest
        .spyOn(timeReportRepository, 'delete')
        .mockImplementation(async () => mockedDeleteResult);

      // Act
      const result: Promise<void> = timeReportService.deleteTimeReport(timeReport.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Time report with id=${timeReport.id} not found`));
      expect(deleteSpy).toHaveBeenCalledWith(timeReport.id);
    });

    it('should pass error thrown by repository', async () => {
      // Arrange
      const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      jest
        .spyOn(timeReportRepository, 'delete')
        .mockImplementation(async () => {
          throw new Error('Repository error');
        });

      // Act
      const result: Promise<void> = timeReportService.deleteTimeReport(timeReport.id);

      // Assert
      await expect(result).rejects.toEqual(new Error('Repository error'));
    });
  });
});
