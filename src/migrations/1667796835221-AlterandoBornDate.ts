import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoBornDate1667796835221 implements MigrationInterface {
    name = 'AlterandoBornDate1667796835221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "born_date" TO "bornDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "bornDate" TO "born_date"`);
    }

}
