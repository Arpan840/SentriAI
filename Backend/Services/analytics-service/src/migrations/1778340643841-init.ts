import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778340643841 implements MigrationInterface {
    name = 'Init1778340643841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_logs" ALTER COLUMN "apiKey" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_logs" ALTER COLUMN "apiKey" SET NOT NULL`);
    }

}
