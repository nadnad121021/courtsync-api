import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableRelationToCourtAndVenue1782886532866 implements MigrationInterface {
    name = 'EnableRelationToCourtAndVenue1782886532866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courts" ADD CONSTRAINT "FK_a6bf498be886614490e788cfa8a" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courts" DROP CONSTRAINT "FK_a6bf498be886614490e788cfa8a"`);
    }

}
