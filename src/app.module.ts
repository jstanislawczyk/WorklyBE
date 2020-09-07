import {Module} from '@nestjs/common';
import {ActivityService} from './service/activity.service';
import {ActivityController} from './controller/activity.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseConfig} from './config/database.config';
import {ActivityRepository} from './repository/activity.repository';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';
import {ActivityTimeReportController} from './controller/activity-time-report.controller';
import {TimeReportService} from './service/time-report.service';
import {TimeReportRepository} from './repository/time-report.repository';
import {ActivityTimeReportFacade} from './facade/activity-time-report.facade';
import {TimeReportController} from './controller/time-report.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(DatabaseConfig.getDatabaseConfig()),
    TypeOrmModule.forFeature([
      ActivityRepository,
      TimeReportRepository,
    ])
  ],
  controllers: [
    ActivityController,
    TimeReportController,
    ActivityTimeReportController,
  ],
  providers: [
    ActivityTimeReportFacade,
    ActivityService,
    TimeReportService,
  ],
})
export class AppModule {

}
