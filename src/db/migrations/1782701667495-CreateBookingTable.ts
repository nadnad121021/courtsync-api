import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookingTable1782701667495 implements MigrationInterface {
    name = 'CreateBookingTable1782701667495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentstatus_enum" AS ENUM('UNPAID', 'PAID', 'FAILED', 'REFUNDED')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "courtId" uuid NOT NULL, "bookingDate" date NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "totalAmount" numeric(10,2) NOT NULL, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'PENDING', "paymentStatus" "public"."bookings_paymentstatus_enum" NOT NULL DEFAULT 'UNPAID', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
    }

}
