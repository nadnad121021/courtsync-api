import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1782705569448 implements MigrationInterface {
    name = 'CreatePaymentTable1782705569448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_method_enum" AS ENUM('CASH', 'GCASH', 'CARD', 'BANK_TRANSFER')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_provider_enum" AS ENUM('MANUAL', 'PAYMONGO', 'STRIPE', 'MAYA', 'GCASH')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookingId" uuid NOT NULL, "userId" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "currency" character varying NOT NULL DEFAULT 'PHP', "method" "public"."payments_method_enum" NOT NULL, "provider" "public"."payments_provider_enum" NOT NULL DEFAULT 'MANUAL', "status" "public"."payments_status_enum" NOT NULL DEFAULT 'PENDING', "providerReferenceId" character varying, "paidAt" TIMESTAMP, "failedReason" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
    }

}
