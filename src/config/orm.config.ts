import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Article } from '../articles/entities/article.entity';
import { User } from '../users/entities/user.entity';
import { InfoEntity } from '../users/info/entities/info.entity';
import { AddCloumnAticle1673680241747 } from '../migrations/1673680241747-AddCloumnAticle';

config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Article, User, InfoEntity],
  migrations: [AddCloumnAticle1673680241747],
});
