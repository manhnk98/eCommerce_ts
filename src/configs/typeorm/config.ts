import { env } from '@environments'
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mongodb',
  host: env.get('mongodb.host'),
  port: env.get('mongodb.port'),
  username: env.get('mongodb.username'),
  password: env.get('mongodb.password'),
  database: env.get('mongodb.database'),
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['src/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
});

export default AppDataSource;  