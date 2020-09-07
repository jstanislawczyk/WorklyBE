import {Test, TestingModule} from '@nestjs/testing';
import {ActivityService} from '../service/activity.service';
import {ActivityRepository} from '../repository/activity.repository';
import {Activity} from '../entity/activity';
import {ActivityFixture} from '../../test/fixture/activity.fixture';
import {ActivityTimeReportController} from './activity-time-report.controller';
import {ActivityTimeReportFacade} from '../facade/activity-time-report.facade';
import {TimeReportService} from '../service/time-report.service';
import {TimeReportRepository} from '../repository/time-report.repository';
import {TimeReport} from '../entity/time-report';
import {TimeReportFixture} from '../../test/fixture/time-report.fixture';
import {TimeReportDtoFixture} from '../../test/fixture/time-report-dto.fixture';
import {TimeReportDto} from '../dto/time-report.dto';
import {NotFoundException} from '@nestjs/common';
import SpyInstance = jest.SpyInstance;

describe('ActivityTimeReportController', () => {
  let activityTimeReportController: ActivityTimeReportController;
  let activityTimeReportFacade: ActivityTimeReportFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityTimeReportController],
      providers: [
        ActivityTimeReportFacade,
        TimeReportService, ActivityService,
        ActivityRepository, TimeReportRepository,
      ],
    }).compile();

    activityTimeReportController = module.get<ActivityTimeReportController>(ActivityTimeReportController);
    activityTimeReportFacade = module.get<ActivityTimeReportFacade>(ActivityTimeReportFacade);
  });

  describe('createActivityTimeReport', () => {
    it('should save time report for activity', async () => {
      // Arrange
      const existingActivity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const timeReportDtoForSave: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithoutId();
      const timeReportForSave: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
      const savedTimeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithOptionalProperties();
      const savedTimeReportDto: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithOptionalProperties();

      const createTimeReportForActivitySpy: SpyInstance<any> = jest
        .spyOn(activityTimeReportFacade, 'createTimeReportForActivity')
        .mockImplementation(async () => savedTimeReport);

      // Act
      const result: Promise<TimeReportDto> = activityTimeReportController.createActivityTimeReport(existingActivity.id, timeReportDtoForSave);

      // Assert
      await expect(result).resolves.toEqual(savedTimeReportDto);
      expect(createTimeReportForActivitySpy).toHaveBeenCalledWith(existingActivity.id, timeReportForSave);
      expect(createTimeReportForActivitySpy).toHaveBeenCalledTimes(1);
    });

    it('should catch exception thrown by activity report facade', async () => {
      // Arrange
      const activityId: number = 1;
      const timeReportDtoForSave: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithoutId();
      const timeReportForSave: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();

      const createTimeReportForActivitySpy: SpyInstance<any> = jest
        .spyOn(activityTimeReportFacade, 'createTimeReportForActivity')
        .mockImplementation(async () => {
          throw new NotFoundException(`Activity with id=${activityId} not found`);
        });

      // Act
      const result: Promise<TimeReportDto> = activityTimeReportController.createActivityTimeReport(activityId, timeReportDtoForSave);

      // Assert
      await expect(result).rejects.toEqual(new NotFoundException(`Activity with id=${activityId} not found`));
      expect(createTimeReportForActivitySpy).toHaveBeenCalledWith(activityId, timeReportForSave);
      expect(createTimeReportForActivitySpy).toHaveBeenCalledTimes(1);
    });
  });
});
