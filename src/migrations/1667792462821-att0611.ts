import { MigrationInterface, QueryRunner } from "typeorm";

export class att06111667792462821 implements MigrationInterface {
    name = 'att06111667792462821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" DROP CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "dateCheckin" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "dateCheckout" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d" FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hotel" DROP CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "dateCheckout" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "dateCheckin" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d" FOREIGN KEY ("managerId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
