import {Test, TestingModule} from '@nestjs/testing';
import {ActivityController} from './activity.controller';
import {ActivityService} from '../service/activity.service';
import {ActivityRepository} from '../repository/activity.repository';
import {Activity} from '../entity/activity';
import {ActivityFixture} from '../../test/fixture/activity.fixture';
import {ActivityDto} from '../dto/activity.dto';
import {ActivityDtoFixture} from '../../test/fixture/activity-dto.fixture';
import SpyInstance = jest.SpyInstance;

describe('ActivityController', () => {
  let activityController: ActivityController;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService, ActivityRepository],
    }).compile();

    activityController = module.get<ActivityController>(ActivityController);
    activityService = module.get<ActivityService>(ActivityService);
  });

  describe('getAllActivities', () => {
    it('should return empty list', async () => {
      // Arrange
      jest
        .spyOn(activityService, 'getAllActivities')
        .mockImplementation(async () => []);

      // Act
      const result: Promise<ActivityDto[]> = activityController.getAllActivities();

      // Assert
      await expect(result).resolves.toEqual([]);
    });

    it('should return list of activities', async () => {
      // Arrange
      const activities: Activity[] = [
        ActivityFixture.getActivityEntityWithOptionalProperties(),
        {
          ...ActivityFixture.getActivityEntityWithOptionalProperties(),
          id: 2,
          name: 'SecondActivity',
        },
      ];
      const expectedActivityDtos: ActivityDto[] = [
        ActivityDtoFixture.getActivityDtoWithOptionalProperties(),
        {
          ...ActivityDtoFixture.getActivityDtoWithOptionalProperties(),
          id: 2,
          name: 'SecondActivity',
        },
      ];

      jest
        .spyOn(activityService, 'getAllActivities')
        .mockImplementation(async () => activities);

      // Act
      const result: Promise<Activity[]> = activityController.getAllActivities();

      // Assert
      await expect(result).resolves.toEqual(expectedActivityDtos);
    });
  });

  describe('getActivityById', () => {
    it('should return activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const expectedActivityDto: ActivityDto = ActivityDtoFixture.getActivityDtoWithOptionalProperties();

      const getActivityByIdSpy: SpyInstance<any> = jest
        .spyOn(activityService, 'getActivityById')
        .mockImplementation(async () => activity);

      // Act
      const result: Promise<Activity> = activityController.getActivityById(activity.id);

      // Assert
      await expect(result).resolves.toEqual(expectedActivityDto);
      expect(getActivityByIdSpy).toHaveBeenCalledWith(activity.id);
    });

    it(`should throw error if activity doesn't exist`, async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

      const getActivityByIdSpy: SpyInstance<any> = jest
        .spyOn(activityService, 'getActivityById')
        .mockImplementation(async () => {
          throw new Error(`Activity with id=${activity.id} not found`);
        });

      // Act
      const result: Promise<Activity> = activityController.getActivityById(activity.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with id=${activity.id} not found`));
      expect(getActivityByIdSpy).toHaveBeenCalledWith(activity.id);
    });
  });

  describe('createActivity', () => {
    it('should save activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntity();
      const savedActivity: Activity = {
        ...activity,
        id: 1,
      };
      const savedActivityDto: ActivityDto = {
        ...ActivityDtoFixture.getActivityDto(),
        id: 1,
      };

      const createActivitySpy: SpyInstance<any> = jest
        .spyOn(activityService, 'createActivity')
        .mockImplementation(async () => savedActivity);

      // Act
      const result: Promise<Activity> = activityController.createActivity(activity);

      // Assert
      await expect(result).resolves.toEqual(savedActivityDto);
      expect(createActivitySpy).toHaveBeenCalledWith(activity);
    });

    it('should throw error', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntity();
      const createActivitySpy: SpyInstance<any> = jest
        .spyOn(activityService, 'createActivity')
        .mockImplementation(async () => {
          throw new Error(`Activity with name=${activity.name} already exists`)
        });

      // Act
      const result: Promise<Activity> = activityController.createActivity(activity);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with name=${activity.name} already exists`));
      expect(createActivitySpy).toHaveBeenCalledWith(activity);
    });
  });

  describe('deleteActivity', () => {
    it('should delete activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

      const deleteActivitySpy: SpyInstance<any> = jest
        .spyOn(activityService, 'deleteActivity');

      // Act
      const result: Promise<void> = activityController.deleteActivity(activity.id);

      // Assert
      await expect(result).resolves;
      expect(deleteActivitySpy).toHaveBeenCalledWith(activity.id);
    });

    it('should not find activity for delete', async () => {
      // Arrange
      const notExistingId: number = 111;

      const deleteActivitySpy: SpyInstance<any> = jest
        .spyOn(activityService, 'deleteActivity')
        .mockImplementation(async () => {
          throw new Error(`Activity with id=${notExistingId} not found`)
        });

      // Act
      const result: Promise<void> = activityController.deleteActivity(notExistingId);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with id=${notExistingId} not found`));
      expect(deleteActivitySpy).toHaveBeenCalledWith(notExistingId);
    });
  });
});
