import { DbLogger } from '../tool/log/log4js';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 33060,
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '7b193a0f16ebbf3d',
    database: process.env.DB_DATABASE ?? 'book',
    timezone: '+08:00',
    charset: 'utf8mb4',
    autoLoadEntities: true,
    //entities: ['./**/*.entity.js'],
    synchronize: true,
    logging: true,
    logger: new DbLogger(),
    flags: '-SESSION_TRACK',
    migrations: ['migration/*.js'],
  },

  REDIS_CONFIG: {
    config: {
      host: process.env.REDIS_HOST ?? '127.0.0.1',
      port: process.env.REDIS_PORT ?? 6379,
      db: 0,
      ttl: 300,
    },
  },
};
