import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourtAvailabiliesTable1782911986702 implements MigrationInterface {
    name = 'CreateCourtAvailabiliesTable1782911986702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "court_availabilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courtId" uuid NOT NULL, "dayOfWeek" integer NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d08c59d4ab8d57b25ff3c8a620e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "court_availabilities" ADD CONSTRAINT "FK_770b4570fdaeb1cb01231a631fe" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court_availabilities" DROP CONSTRAINT "FK_770b4570fdaeb1cb01231a631fe"`);
        await queryRunner.query(`DROP TABLE "court_availabilities"`);
    }

}
