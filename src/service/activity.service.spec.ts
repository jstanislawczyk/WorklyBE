import {Test, TestingModule} from '@nestjs/testing';
import {ActivityService} from './activity.service';
import {ActivityRepository} from '../repository/activity.repository';
import {Activity} from '../entity/activity';
import {ActivityFixture} from '../../test/fixture/activity.fixture';
import SpyInstance = jest.SpyInstance;
import {DeleteResult} from 'typeorm';

describe('ActivityService', () => {
  let activityService: ActivityService;
  let activityRepository: ActivityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityService, ActivityRepository],
    }).compile();

    activityService = module.get<ActivityService>(ActivityService);
    activityRepository = module.get<ActivityRepository>(ActivityRepository);
  });

  describe('getAllActivities', () => {
    it('should return empty list', async () => {
      // Arrange
      jest
        .spyOn(activityRepository, 'find')
        .mockImplementation(async () => []);

      // Act
      const result: Promise<Activity[]> = activityService.getAllActivities();

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

      jest
        .spyOn(activityRepository, 'find')
        .mockImplementation(async () => activities);

      // Act
      const result: Promise<Activity[]> = activityService.getAllActivities();

      // Assert
      await expect(result).resolves.toEqual(activities);
    });
  });

  describe('getActivityById', () => {
    it('should return activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'findOneOrFail')
        .mockImplementation(async () => activity);

      // Act
      const result: Promise<Activity> = activityService.getActivityById(activity.id);

      // Assert
      await expect(result).resolves.toEqual(activity);
      expect(findOneOrFailSpy).toHaveBeenCalledWith(activity.id);
    });

    it(`should throw error if activity doesn't exist`, async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

      const findOneOrFailSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'findOneOrFail')
        .mockImplementation(async () => {
          throw new Error('Not found');
        });

      // Act
      const result: Promise<Activity> = activityService.getActivityById(activity.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with id=${activity.id} not found`));
      expect(findOneOrFailSpy).toHaveBeenCalledWith(activity.id);
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

      const findByNameSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'findByName')
        .mockImplementation(async () => undefined);

      const saveSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'save')
        .mockImplementation(async () => savedActivity);

      // Act
      const result: Promise<Activity> = activityService.createActivity(activity);

      // Assert
      await expect(result).resolves.toEqual(savedActivity);
      expect(findByNameSpy).toHaveBeenCalledWith(activity.name);
      expect(saveSpy).toHaveBeenCalledWith(activity);
    });

    it('should throw error if activity with the same already exists', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntity();
      const existingActivity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();

      const findByNameSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'findByName')
        .mockImplementation(async () => activity);

      // Act
      const result: Promise<Activity> = activityService.createActivity(existingActivity);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with name=${activity.name} already exists`));
      expect(findByNameSpy).toHaveBeenCalledWith(activity.name);
    });
  });

  describe('deleteActivity', () => {
    it('should delete activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const mockedDeleteResult: DeleteResult = {
        affected: 1,
        raw: {},
      };

      const deleteSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'delete')
        .mockImplementation(async () => mockedDeleteResult);

      // Act
      const result: Promise<void> = activityService.deleteActivity(activity.id);

      // Assert
      await expect(result).resolves;
      expect(deleteSpy).toHaveBeenCalledWith(activity.id);
    });

    it('should delete activity', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithOptionalProperties();
      const mockedDeleteResult: DeleteResult = {
        affected: 0,
        raw: {},
      };

      const deleteSpy: SpyInstance<any> = jest
        .spyOn(activityRepository, 'delete')
        .mockImplementation(async () => mockedDeleteResult);

      // Act
      const result: Promise<void> = activityService.deleteActivity(activity.id);

      // Assert
      await expect(result).rejects.toEqual(new Error(`Activity with id=${activity.id} not found`));
      expect(deleteSpy).toHaveBeenCalledWith(activity.id);
    });
  });
});
