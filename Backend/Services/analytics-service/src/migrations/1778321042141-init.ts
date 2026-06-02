import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1778321042141 implements MigrationInterface {
  name = 'Init1778321042141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usage_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "apiKey" character varying NOT NULL, "endpoint" character varying NOT NULL, "method" character varying NOT NULL, "allowed" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38ed6efac407c7a3f818d90c279" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usage_logs"`);
  }
}
