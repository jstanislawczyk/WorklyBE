import * as request from 'supertest';
import {Application} from '../../src/config/application';
import {ActivityTestRepository} from '../repository/activity.test-repository';
import {Activity} from '../../src/entity/activity';
import {ActivityFixture} from '../fixture/activity.fixture';
import {TimeReportDto} from '../../src/dto/time-report.dto';
import {TimeReportDtoFixture} from '../fixture/time-report-dto.fixture';
import {TimeReportTestRepository} from '../repository/time-report.test-repository';
import {TimeReport} from '../../src/entity/time-report';
import {TimeReportFixture} from '../fixture/time-report.fixture';
import {TimeReportUpdateDto} from '../../src/dto/time-report-update.dto';
import {TimeReportUpdateDtoFixture} from '../fixture/time-report-update-dto.fixture';

describe('API', () => {

  const activityTestRepository: ActivityTestRepository = new ActivityTestRepository();
  const timeReportTestRepository: TimeReportTestRepository = new TimeReportTestRepository();
  let application: Application;
  let url: string;

  beforeAll(async () => {
    application = new Application();
    await application.start();
    url = await application.getUrl();

    await timeReportTestRepository.init();
    await activityTestRepository.init();
    await timeReportTestRepository.deleteAll();
    await activityTestRepository.deleteAll();
  });

  afterEach(async () => {
    await timeReportTestRepository.deleteAll();
    await activityTestRepository.deleteAll();
  });

  afterAll(async () => {
    await application.stop();
  });

  describe('Activity', () => {

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

  describe('TimeReport', () => {

    describe('GET /api/time-report/:id', () => {
      it('should not found time report', () => {
        // Act & Assert
        return request(url)
          .get('/api/time-report/111')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Time report with id=111 not found',
            error: 'Not Found',
          });
      });

      it('should find time report by id', async () => {
        // Arrange
        const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
        const savedTimeReport: TimeReport = await timeReportTestRepository.save(timeReport);

        // Act & Assert
        return request(url)
          .get(`/api/time-report/${savedTimeReport.id}`)
          .expect('Content-Type', /json/)
          .expect(201)
          .expect({
            id: savedTimeReport.id,
            startDate: savedTimeReport.startDate.toISOString(),
            endDate: savedTimeReport.endDate.toISOString(),
            description: savedTimeReport.description,
          });
      });
    });

    describe('PATCH /api/time-report/:id\'', () => {
      it('should not found time report', () => {
        // Act & Assert
        return request(url)
          .patch('/api/time-report/111')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Time report with id=111 not found',
            error: 'Not Found',
          });
      });

      it('should update time report with all properties from model', async () => {
        // Arrange
        const timeReportUpdateDto: TimeReportUpdateDto = TimeReportUpdateDtoFixture.getTimeReportUpdateDto();
        const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
        const savedTimeReport: TimeReport = await timeReportTestRepository.save(timeReport);

        // Act & Assert
        return request(url)
          .patch(`/api/time-report/${savedTimeReport.id}`)
          .send(timeReportUpdateDto)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({
            id: savedTimeReport.id,
            startDate: new Date(10000).toISOString(),
            endDate: new Date(20000).toISOString(),
            description: 'Updated test description',
          })
          .then(async () => {
            const updatedTimeReport: TimeReport = await timeReportTestRepository.findById(savedTimeReport.id);

            expect(updatedTimeReport).toEqual({
              id: savedTimeReport.id,
              startDate: new Date(10000),
              endDate: new Date(20000),
              description: 'Updated test description',
            });
          });
      });

      it('should only update time report description', async () => {
        // Arrange
        const timeReportUpdateDto: TimeReportUpdateDto = TimeReportUpdateDtoFixture.getTimeReportUpdateDtoWitDescriptionOnly();
        const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
        const savedTimeReport: TimeReport = await timeReportTestRepository.save(timeReport);

        // Act & Assert
        return request(url)
          .patch(`/api/time-report/${savedTimeReport.id}`)
          .send(timeReportUpdateDto)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect({
            id: savedTimeReport.id,
            startDate: savedTimeReport.startDate.toISOString(),
            endDate: savedTimeReport.endDate.toISOString(),
            description: 'Updated test description',
          })
          .then(async () => {
            const updatedTimeReport: TimeReport = await timeReportTestRepository.findById(savedTimeReport.id);

            expect(updatedTimeReport).toEqual({
              id: savedTimeReport.id,
              startDate: savedTimeReport.startDate,
              endDate: savedTimeReport.endDate,
              description: 'Updated test description',
            });
          });
      });
    });

    describe('DELETE /api/time-report/:id', () => {
      it('should not delete not existing time report', () => {
        // Act & Assert
        return request(url)
          .delete('/api/time-report/111')
          .expect(404)
          .expect({
            statusCode: 404,
            message: 'Time report with id=111 not found',
            error: 'Not Found',
          });
      });

      it('should delete time report by id', async () => {
        // Arrange
        const timeReport: TimeReport = TimeReportFixture.getTimeReportEntityWithoutId();
        const savedTimeReport: TimeReport = await timeReportTestRepository.save(timeReport);

        // Act & Assert
        return request(url)
          .delete(`/api/time-report/${savedTimeReport.id}`)
          .expect(204)
          .expect({})
          .then(async () => {
            const timeReportActivity: TimeReport = await timeReportTestRepository.findById(savedTimeReport.id);

            expect(timeReportActivity).toBeUndefined();
          });
      });
    });
  });

  describe('ActivityTimeReport', () => {

    describe('POST /api/activity/:activityId/time-report', () => {
      it('should catch activity not found error', async () => {
        // Arrange
        const timeReportToSave: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithoutId();
        const notExistingId: number = 111;

        // Act & Assert
        return request(url)
          .post(`/api/activity/${notExistingId}/time-report`)
          .send(timeReportToSave)
          .expect(404)
          .expect({
            statusCode: 404,
            message: `Activity with id=${notExistingId} not found`,
            error: 'Not Found',
          });
      });

      it('should save time report for activity', async () => {
        // Arrange
        const activity: Activity = ActivityFixture.getActivityEntityWithoutId();
        const existingActivity: Activity = await activityTestRepository.save(activity);
        const timeReportToSave: TimeReportDto = TimeReportDtoFixture.getTimeReportDtoWithoutId();

        // Act & Assert
        return request(url)
          .post(`/api/activity/${existingActivity.id}/time-report`)
          .send(timeReportToSave)
          .expect(201)
          .then(async (response: Record<string, any>) => {
            const timeReportResponse: TimeReportDto = response.body;
            const savedTimeReport: TimeReport = await timeReportTestRepository.findById(timeReportResponse.id);

            expect(typeof timeReportResponse.id).toEqual('number');
            expect(timeReportResponse.startDate).toBe(timeReportToSave.startDate);
            expect(timeReportResponse.endDate).toBe(timeReportToSave.endDate);
            expect(timeReportResponse.description).toEqual(timeReportToSave.description);

            expect(savedTimeReport.id).toEqual(timeReportResponse.id);
            expect(savedTimeReport.startDate.toISOString()).toEqual(timeReportResponse.startDate);
            expect(savedTimeReport.endDate.toISOString()).toEqual(timeReportResponse.endDate);
            expect(savedTimeReport.description).toEqual(timeReportResponse.description);
          });
      });
    });
  });
});
