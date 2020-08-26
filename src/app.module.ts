import {Module} from '@nestjs/common';
import {ActivityService} from './service/activity.service';
import {ActivityController} from './controller/activity/activity.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseConfig} from './config/database.config';
import {ActivityRepository} from './repository/activity.repository';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot(DatabaseConfig.getDatabaseConfig()),
    TypeOrmModule.forFeature([
      ActivityRepository,
    ])
  ],
  controllers: [
    ActivityController,
  ],
  providers: [
    ActivityService,
  ],
})
export class AppModule {

}
