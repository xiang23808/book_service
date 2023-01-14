import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCloumnAticle1673680241747 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'articles',
          new TableColumn({
              name: 'delete_time',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('articles', 'delete_time');
    }
}
