import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778775125996 implements MigrationInterface {
    name = 'Init1778775125996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "encryptionKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_95ee4bb5edc7e7b8f5e2b71e715" UNIQUE ("encryptionKey")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_95ee4bb5edc7e7b8f5e2b71e715"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "encryptionKey"`);
    }

}
