import { MigrationInterface, QueryRunner } from "typeorm";

export class testMigrationsns1667589557254 implements MigrationInterface {
    name = 'testMigrationsns1667589557254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4f4c72bcb42562b70c56ed64055"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "anddressId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "addressId" TO "anddressId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4f4c72bcb42562b70c56ed64055" FOREIGN KEY ("anddressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
