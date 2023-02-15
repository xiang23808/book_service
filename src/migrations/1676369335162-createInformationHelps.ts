import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createInformationHelps1676369335162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'help',
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
            name: 'order',
            type: 'int',
            comment: '排序',
          },
          {
            name: 'status',
            type: 'tinyint',
            comment: '用户状态:1-正常:0:禁用',
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
    await queryRunner.dropTable('help');
  }
}
