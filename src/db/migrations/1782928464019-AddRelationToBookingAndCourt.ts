import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationToBookingAndCourt1782928464019 implements MigrationInterface {
    name = 'AddRelationToBookingAndCourt1782928464019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_e8e9a995f2078e6c39793a7f16b" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_e8e9a995f2078e6c39793a7f16b"`);
    }

}
