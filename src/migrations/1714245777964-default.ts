import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1714245777964 implements MigrationInterface {
    name = 'Default1714245777964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "films" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(255), CONSTRAINT "UQ_ef6e0245decf772d1dd66f158ae" UNIQUE ("title"), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_films" ("id" SERIAL NOT NULL, "user_id" integer, "film_id" integer, CONSTRAINT "PK_713571345882c9f87dbc47d635f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_films" ADD CONSTRAINT "FK_0c8d589692bc157964aa2a1c451" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_films" ADD CONSTRAINT "FK_0b216b51cce4edcd1a43d3bfe04" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_films" DROP CONSTRAINT "FK_0b216b51cce4edcd1a43d3bfe04"`);
        await queryRunner.query(`ALTER TABLE "favorite_films" DROP CONSTRAINT "FK_0c8d589692bc157964aa2a1c451"`);
        await queryRunner.query(`DROP TABLE "favorite_films"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "films"`);
    }

}
