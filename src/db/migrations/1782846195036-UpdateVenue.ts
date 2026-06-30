import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateVenue1782846195036 implements MigrationInterface {
    name = 'UpdateVenue1782846195036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."venues_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "venues" ADD "status" "public"."venues_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "longitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "contactNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "openingTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "closingTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "closingTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "openingTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "contactNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "longitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" ALTER COLUMN "latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "venues" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."venues_status_enum"`);
    }

}
