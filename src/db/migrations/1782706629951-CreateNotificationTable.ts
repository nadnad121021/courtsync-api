import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationTable1782706629951 implements MigrationInterface {
    name = 'CreateNotificationTable1782706629951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notifications_type_enum" AS ENUM('BOOKING_CREATED', 'BOOKING_CONFIRMED', 'BOOKING_CANCELLED', 'PAYMENT_COMPLETED', 'PAYMENT_FAILED')`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_channel_enum" AS ENUM('EMAIL', 'SMS', 'PUSH', 'IN_APP')`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_status_enum" AS ENUM('PENDING', 'SENT', 'FAILED', 'READ')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" "public"."notifications_type_enum" NOT NULL, "channel" "public"."notifications_channel_enum" NOT NULL, "title" character varying NOT NULL, "message" text NOT NULL, "status" "public"."notifications_status_enum" NOT NULL DEFAULT 'PENDING', "metadata" jsonb, "sentAt" TIMESTAMP, "readAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_channel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_type_enum"`);
    }

}
