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
import {AuthService} from './service/auth.service';
import {UsersService} from './service/users.service';
import {AuthController} from './controller/auth.controller';
import {LocalStrategy} from './security/local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(DatabaseConfig.getDatabaseConfig()),
    TypeOrmModule.forFeature([
      ActivityRepository,
      TimeReportRepository,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'secret',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES ?? '60s',
      },
    }),
  ],
  controllers: [
    ActivityController,
    AuthController,
    TimeReportController,
    ActivityTimeReportController,
  ],
  providers: [
    ActivityTimeReportFacade,
    ActivityService,
    TimeReportService,
    AuthService,
    UsersService,
    LocalStrategy,
    PassportModule,
  ],
})
export class AppModule {

}
