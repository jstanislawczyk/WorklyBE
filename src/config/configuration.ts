export default () => ({
  environment: process.env.NODE_ENV || 'dev',
  app: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    connectionName: 'default',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    name: process.env.DATABASE_NAME || 'workly',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
  },
  security: {
    jwt: {
      secret: process.env.JWT_SECRET ?? 'secret',
      expiresIn: process.env.JWT_EXPIRES ?? '60s',
    },
  }
});
