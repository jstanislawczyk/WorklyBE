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
import {JwtStrategy} from './security/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {LocalStrategy} from './security/local.strategy';
import {UserRepository} from './repository/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(DatabaseConfig.getDatabaseConfig()),
    TypeOrmModule.forFeature([
      ActivityRepository,
      TimeReportRepository,
      UserRepository,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: configuration().security.jwt.secret,
      signOptions: {
        expiresIn: configuration().security.jwt.expiresIn,
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
    JwtStrategy,
    LocalStrategy,
    PassportModule,
  ],
})
export class AppModule {

}
