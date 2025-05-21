import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1746731409083 implements MigrationInterface {
  name = 'CreateTables1746731409083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "films" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "rating" double precision NOT NULL,
            "director" character varying NOT NULL,
            "tags" character varying NOT NULL,
            "image" character varying NOT NULL,
            "cover" character varying NOT NULL,
            "title" character varying NOT NULL,
            "about" character varying NOT NULL,
            "description" character varying NOT NULL,
            CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id")
          )
        `);

    await queryRunner.query(`
          CREATE TABLE "schedules" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "daytime" character varying NOT NULL,
            "hall" integer NOT NULL,
            "rows" integer NOT NULL,
            "seats" integer NOT NULL,
            "price" integer NOT NULL,
            "taken" character varying NOT NULL,
            "filmId" uuid NOT NULL,
            CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id")
          )
        `);

    await queryRunner.query(`
          ALTER TABLE "schedules"
          ADD CONSTRAINT "FK_7876c96cecc19ed1e6bd2a76d24"
          FOREIGN KEY ("filmId") REFERENCES "films"("id")
          ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE "schedules" DROP CONSTRAINT "FK_7876c96cecc19ed1e6bd2a76d24"
        `);
    await queryRunner.query(`DROP TABLE "schedules"`);
    await queryRunner.query(`DROP TABLE "films"`);
  }
}
