import {Test, TestingModule} from '@nestjs/testing';
import {TimeReport} from '../entity/time-report';
import {TimeReportFixture} from '../../test/fixture/time-report.fixture';
import {ActivityFixture} from '../../test/fixture/activity.fixture';
import {Activity} from '../entity/activity';
import {TimeReportService} from '../service/time-report.service';
import {ActivityService} from '../service/activity.service';
import {ActivityTimeReportFacade} from './activity-time-report.facade';
import {TimeReportRepository} from '../repository/time-report.repository';
import {ActivityRepository} from '../repository/activity.repository';
import {NotFoundException} from '@nestjs/common';
import SpyInstance = jest.SpyInstance;

describe('ActivityTimeReportFacade', () => {
  let activityTimeReportFacade: ActivityTimeReportFacade;
  let timeReportService: TimeReportService;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityTimeReportFacade,
        TimeReportService, ActivityService,
        ActivityRepository, TimeReportRepository,
      ],
    }).compile();

    activityTimeReportFacade = module.get<ActivityTimeReportFacade>(ActivityTimeReportFacade);
    timeReportService = module.get<TimeReportService>(TimeReportService);
    activityService = module.get<ActivityService>(ActivityService);
  });

  describe('saveTimeReportForActivity', () => {
    it('should save time report for activity', async () => {
      // Arrange
      const existingActivity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const timeReportForSave: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
      const timeReportForSavePopulatedWithActivity: TimeReport = TimeReportFixture.getTimeReportEntityWithIdAndActivity();
      const savedTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const getActivityByIdSpy: SpyInstance<any> = jest
        .spyOn(activityService, 'getActivityById')
        .mockImplementation(async () => existingActivity);

      const createActivityTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'createTimeReport')
        .mockImplementation(async () => savedTimeReport);

      // Act
      const result: Promise<TimeReport> =
        activityTimeReportFacade.createTimeReportForActivity(existingActivity.id, timeReportForSave);

      // Assert
      await expect(result).resolves.toEqual(savedTimeReport);
      expect(getActivityByIdSpy).toHaveBeenCalledWith(existingActivity.id);
      expect(getActivityByIdSpy).toHaveBeenCalledTimes(1);
      expect(createActivityTimeReportSpy).toHaveBeenCalledWith(timeReportForSavePopulatedWithActivity);
      expect(createActivityTimeReportSpy).toHaveBeenCalledTimes(1);
    });

    it('should pass error if activity was not found', async () => {
      // Arrange
      const activityId: number = 1;
      const timeReportForSave: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const savedTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();

      const getActivityByIdSpy: SpyInstance<any> = jest
        .spyOn(activityService, 'getActivityById')
        .mockImplementation(async () => {
          throw new NotFoundException(`Activity with id=${activityId} not found`);
        });

      const createActivityTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'createTimeReport')
        .mockImplementation(async () => savedTimeReport);

      // Act
      const result: Promise<TimeReport> = activityTimeReportFacade.createTimeReportForActivity(activityId, timeReportForSave);

      // Assert
      await expect(result).rejects.toEqual(new NotFoundException(`Activity with id=${activityId} not found`));
      expect(getActivityByIdSpy).toHaveBeenCalledWith(activityId);
      expect(getActivityByIdSpy).toHaveBeenCalledTimes(1);
      expect(createActivityTimeReportSpy).toHaveBeenCalledTimes(0);
    });

    it('should pass error if time report save have failed', async () => {
      // Arrange
      const existingActivity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const timeReportForSave: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
      const timeReportForSavePopulatedWithActivity: TimeReport = TimeReportFixture.getTimeReportEntityWithIdAndActivity();

      const getActivityByIdSpy: SpyInstance<any> = jest
        .spyOn(activityService, 'getActivityById')
        .mockImplementation(async () => existingActivity);

      const createActivityTimeReportSpy: SpyInstance<any> = jest
        .spyOn(timeReportService, 'createTimeReport')
        .mockImplementation(async () => {
          throw new Error('TestError');
        });

      // Act
      const result: Promise<TimeReport> = activityTimeReportFacade.createTimeReportForActivity(existingActivity.id, timeReportForSave);

      // Assert
      await expect(result).rejects.toEqual(new Error('TestError'));
      expect(getActivityByIdSpy).toHaveBeenCalledWith(existingActivity.id);
      expect(getActivityByIdSpy).toHaveBeenCalledTimes(1);
      expect(createActivityTimeReportSpy).toHaveBeenCalledWith(timeReportForSavePopulatedWithActivity);
      expect(createActivityTimeReportSpy).toHaveBeenCalledTimes(1);
    });
  });
});
