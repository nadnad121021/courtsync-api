import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingTable1782926540307 implements MigrationInterface {
    name = 'UpdateBookingTable1782926540307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "bookingCode" text`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentmethod_enum" AS ENUM('CASH', 'ONLINE')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentMethod" "public"."bookings_paymentmethod_enum" NOT NULL DEFAULT 'CASH'`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "notes" text`);
        await queryRunner.query(`ALTER TYPE "public"."bookings_paymentstatus_enum" ADD VALUE 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentstatus_enum_old" AS ENUM('UNPAID', 'PAID', 'FAILED', 'REFUNDED')`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "paymentStatus" TYPE "public"."bookings_paymentstatus_enum_old" USING "paymentStatus"::"text"::"public"."bookings_paymentstatus_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."bookings_paymentstatus_enum_old" RENAME TO "bookings_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentmethod_enum"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "bookingCode"`);
    }

}
