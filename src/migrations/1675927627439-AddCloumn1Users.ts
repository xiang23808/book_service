import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCloumn1Users1675927627439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        default: `''`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'phone');
  }
}
