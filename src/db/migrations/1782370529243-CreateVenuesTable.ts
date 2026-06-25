import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVenuesTable1782370529243 implements MigrationInterface {
    name = 'CreateVenuesTable1782370529243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "venues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "province" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "contactNumber" character varying NOT NULL, "openingTime" character varying NOT NULL, "closingTime" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "venues"`);
    }

}
