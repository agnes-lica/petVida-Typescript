import { MigrationInterface, QueryRunner } from "typeorm";

export class testMigrationsns1667586981141 implements MigrationInterface {
    name = 'testMigrationsns1667586981141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(50) NOT NULL, "number" character varying(50) NOT NULL, "state" character varying(50) NOT NULL, "country" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "code" character varying(50) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "categoryId" uuid, "userId" uuid, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "born_date" character varying(10) NOT NULL, "whatsapp" character varying(15) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isAdm" boolean NOT NULL DEFAULT false, "cpf" character varying(11) NOT NULL, "hotelId" uuid, "anddressId" uuid, CONSTRAINT "UQ_956434dfd305a85d14dc92efb23" UNIQUE ("whatsapp"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_4f4c72bcb42562b70c56ed6405" UNIQUE ("anddressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hotel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "corporateName" character varying(255) NOT NULL, "cnpj" character varying(19) NOT NULL, "fantasyName" character varying(255) NOT NULL, "capacity" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "whatsapp" character varying(15) NOT NULL, "email" character varying(50) NOT NULL, "addressId" uuid, "managerId" uuid, CONSTRAINT "UQ_a4c0e519b77f81b8a4132d5dafd" UNIQUE ("corporateName"), CONSTRAINT "UQ_2735078c6c944baaa1b3d3fb93a" UNIQUE ("fantasyName"), CONSTRAINT "REL_5dcf3386a6263afed5bd1ca791" UNIQUE ("addressId"), CONSTRAINT "REL_1bae42d07bca7d7e7ddf0b59d5" UNIQUE ("managerId"), CONSTRAINT "PK_3a62ac86b369b36c1a297e9ab26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookingDate" date NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT true, "checkin" boolean NOT NULL DEFAULT false, "checkout" boolean NOT NULL DEFAULT false, "dateCheckin" date NOT NULL, "dateCheckout" date NOT NULL, "petsId" uuid, "hotelId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pet" ADD CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ba55c97cf1bcb6490cc597e241b" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_4f4c72bcb42562b70c56ed64055" FOREIGN KEY ("anddressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD CONSTRAINT "FK_5dcf3386a6263afed5bd1ca791c" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hotel" ADD CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d" FOREIGN KEY ("managerId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_7975cc11be62773d4d4206e276b" FOREIGN KEY ("petsId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_a8c9f0b0d2e97e4cdf825d3d830" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_a8c9f0b0d2e97e4cdf825d3d830"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_7975cc11be62773d4d4206e276b"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP CONSTRAINT "FK_1bae42d07bca7d7e7ddf0b59d5d"`);
        await queryRunner.query(`ALTER TABLE "hotel" DROP CONSTRAINT "FK_5dcf3386a6263afed5bd1ca791c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_4f4c72bcb42562b70c56ed64055"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ba55c97cf1bcb6490cc597e241b"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479"`);
        await queryRunner.query(`ALTER TABLE "pet" DROP CONSTRAINT "FK_c46f17a55aefa4484cf6bcbe3ab"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "hotel"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "pet"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
