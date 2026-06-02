import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1780149216721 implements MigrationInterface {
    name = 'Init1780149216721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_usage_logs_api_key_client_user_id" ON "usage_logs" ("apiKey", "clientUserId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_usage_logs_api_key_client_user_id"`);
    }

}
