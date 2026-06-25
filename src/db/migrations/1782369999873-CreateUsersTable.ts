import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1782369999873 implements MigrationInterface {
    name = 'CreateUsersTable1782369999873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "deletedBy" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_user_active_not_deleted" ON "users"  ("isActive") WHERE "isDeleted" = false`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_email" ON "users"  ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_active_not_deleted"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
