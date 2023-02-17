import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createInformationFeedbacks1676624192270
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feedback',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            comment: '标题',
          },
          {
            name: 'content',
            type: 'text',
            comment: '内容',
          },
          {
            name: 'type',
            type: 'tinyint',
            comment: '类型:1-功能异常,2-体验问题,3-功能建议,0-其他',
            default: 0,
          },
          {
            name: 'status',
            type: 'tinyint',
            comment: '状态:1-正常:0:禁用',
          },
          {
            name: 'user_id',
            type: 'int',
            comment: '用户id',
          },
          {
            name: 'created_date',
            type: 'date',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feedback');
  }
}
