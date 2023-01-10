import { DbLogger } from '../tool/log/log4js';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 33060,
    username: 'root',
    password: '7b193a0f16ebbf3d',
    database: 'book',
    timezone: '+08:00',
    charset: 'utf8mb4',
    autoLoadEntities: true,
    //entities: ['./**/*.entity.js'],
    synchronize: true,
    logging: true,
    logger: new DbLogger(),
    flags: '-SESSION_TRACK',
  },

  REDIS_CONFIG: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
  },
};
