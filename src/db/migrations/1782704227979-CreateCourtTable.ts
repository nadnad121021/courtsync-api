import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourtTable1782704227979 implements MigrationInterface {
    name = 'CreateCourtTable1782704227979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."courts_sporttype_enum" AS ENUM('BASKETBALL', 'BADMINTON', 'TENNIS', 'PICKLEBALL', 'VOLLEYBALL', 'FUTSAL')`);
        await queryRunner.query(`CREATE TYPE "public"."courts_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE')`);
        await queryRunner.query(`CREATE TABLE "courts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venueId" uuid NOT NULL, "name" character varying NOT NULL, "sportType" "public"."courts_sporttype_enum" NOT NULL, "surfaceType" character varying, "indoor" boolean NOT NULL DEFAULT true, "pricePerHour" numeric(10,2) NOT NULL, "status" "public"."courts_status_enum" NOT NULL DEFAULT 'ACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_948a5d356c3083f3237ecbf9897" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courts"`);
        await queryRunner.query(`DROP TYPE "public"."courts_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."courts_sporttype_enum"`);
    }

}
