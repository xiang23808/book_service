import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { formatDate } from '../../tool/date/date';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: `./public/uploads/${new formatDate().getDate()}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],

  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}
