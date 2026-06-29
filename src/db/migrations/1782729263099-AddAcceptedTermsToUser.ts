import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAcceptedTermsToUser1782729263099 implements MigrationInterface {
    name = 'AddAcceptedTermsToUser1782729263099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "acceptedTerms" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "acceptedTerms"`);
    }

}
