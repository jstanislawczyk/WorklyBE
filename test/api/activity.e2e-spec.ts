import * as request from 'supertest';
import {Application} from '../../src/config/application';
import {ActivityTestRepository} from '../repository/activity.test-repository';
import {Activity} from '../../src/entity/activity';
import {ActivityFixture} from '../fixture/activity.fixture';

describe('Activity (api)', () => {

  const activityTestRepository: ActivityTestRepository = new ActivityTestRepository();
  let application: Application;
  let url: string;

  beforeAll(async () => {
    application = new Application();
    await application.start();
    url = await application.getUrl();

    await activityTestRepository.init();
    await activityTestRepository.deleteAll();
  });

  afterEach(async () => {
    await activityTestRepository.deleteAll();
  });

  afterAll(async () => {
    await application.stop();
  });

  describe('GET /api/activity', () => {
    it('should fetch empty list', () => {
      // Act & Assert
      return request(url)
        .get('/api/activity')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect([]);
    });

    it('should fetch list of activities', async () => {
      // Arrange
      const activities: Activity[] = [
        ActivityFixture.getActivityEntityWithoutId(),
        {
          ...ActivityFixture.getActivityEntityWithoutId(),
          description: 'Second description',
          name: 'Second activity',
        }
      ];

      const savedActivities: Activity[] = await activityTestRepository.saveAll(activities);

      // Act & Assert
      return request(url)
        .get('/api/activity')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(
          [
            {
              id: savedActivities[0].id,
              name: savedActivities[0].name,
              activityType: savedActivities[0].activityType,
              description: savedActivities[0].description,
            },
            {
              id: savedActivities[1].id,
              name: savedActivities[1].name,
              activityType: savedActivities[1].activityType,
              description: savedActivities[1].description,
            },
          ],
        );
    });
  });

  describe('GET /api/activity/:id', () => {
    it('should not found activity', () => {
      // Act & Assert
      return request(url)
        .get('/api/activity/111')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Activity with id=111 not found',
          error: 'Not Found',
        });
    });

    it('should find activity by id', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithoutId();
      const savedActivity: Activity = await activityTestRepository.save(activity);

      // Act & Assert
      return request(url)
        .get(`/api/activity/${savedActivity.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
          id: savedActivity.id,
          name: savedActivity.name,
          activityType: savedActivity.activityType,
          description: savedActivity.description,
        });
    });
  });

  describe('POST /api/activity/:id', () => {
    it('should save activity', async () => {
      // Arrange
      const activityToSave: Activity = ActivityFixture.getActivityEntityWithoutId();

      // Act & Assert
      return request(url)
        .post('/api/activity')
        .send(activityToSave)
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response: Record<string, any>) => {
          const activityResponse: Activity = response.body;
          const savedActivity: Activity = await activityTestRepository.findById(activityResponse.id);

          expect(typeof activityResponse.id).toBe('number');
          expect(activityResponse.activityType).toBe(activityToSave.activityType);
          expect(activityResponse.name).toBe(activityToSave.name);
          expect(activityResponse.description).toBe(activityToSave.description);
          expect(activityResponse.activityTimeReports).toBeUndefined();

          expect(savedActivity.id).toBe(activityResponse.id);
          expect(savedActivity.activityType).toBe(activityToSave.activityType);
          expect(savedActivity.name).toBe(activityToSave.name);
          expect(savedActivity.description).toBe(activityToSave.description);
          expect(savedActivity.activityTimeReports).toBeUndefined();
        });
    });

    it('should catch activity save error', async () => {
      // Arrange
      const activityToSave: Activity = ActivityFixture.getActivityEntityWithoutId();
      const savedActivity: Activity = await activityTestRepository.save(activityToSave);

      // Act & Assert
      return request(url)
        .post('/api/activity')
        .send(activityToSave)
        .expect(400)
        .expect({
          statusCode: 400,
          message: `Activity with name=${savedActivity.name} already exists`,
          error: 'Bad Request',
        });
    });
  });

  describe('DELETE /api/activity/:id', () => {
    it('should not delete not existing activity', () => {
      // Act & Assert
      return request(url)
        .delete('/api/activity/111')
        .expect(404)
        .expect({
          statusCode: 404,
          message: 'Activity with id=111 not found',
          error: 'Not Found',
        });
    });

    it('should delete activity by id', async () => {
      // Arrange
      const activity: Activity = ActivityFixture.getActivityEntityWithoutId();
      const savedActivity: Activity = await activityTestRepository.save(activity);

      // Act & Assert
      return request(url)
        .delete(`/api/activity/${savedActivity.id}`)
        .expect(204)
        .expect({})
        .then(async () => {
          const existingActivity: Activity = await activityTestRepository.findById(savedActivity.id);

          expect(existingActivity).toBeUndefined();
        });
    });
  });
});
