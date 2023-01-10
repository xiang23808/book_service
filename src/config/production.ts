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
    port: 3306,
    username: 'root',
    password: 'f67a69a4957d471d',
    database: 'book',
    timezone: '+08:00',
    charset: 'utf8mb4',
    //entities: ['./**/*.entity.js'],
    synchronize: false,
    autoLoadEntities: true,
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
