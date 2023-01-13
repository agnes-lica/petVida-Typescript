import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoIsconfirmed1667798478323 implements MigrationInterface {
    name = 'AlterandoIsconfirmed1667798478323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "isConfirmed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "isConfirmed" SET DEFAULT true`);
    }

}
