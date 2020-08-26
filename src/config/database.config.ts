import configuration from './configuration';

export class DatabaseConfig {

  public static getDatabaseConfig(): Record<string, any> {

    return {
      name: configuration().database.connectionName,
      type: 'mysql',
      host: configuration().database.host,
      port: configuration().database.port,
      database: configuration().database.name,
      username: configuration().database.username,
      password: configuration().database.password,
      entities: [
        configuration().environment === 'test'
          ? 'src/entity/**/*.ts'
          : 'dist/entity/**/*.js',
      ],
      synchronize: true,
    };
  }
}
