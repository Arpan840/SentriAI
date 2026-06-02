import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778687075874 implements MigrationInterface {
    name = 'Init1778687075874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "clientUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "usage_logs" ADD "clientUserIp" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "clientUserIp"`);
        await queryRunner.query(`ALTER TABLE "usage_logs" DROP COLUMN "clientUserId"`);
    }

}
