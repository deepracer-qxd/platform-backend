import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEntities1712452699748 implements MigrationInterface {
    name = 'BaseEntities1712452699748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "models" ("id" SERIAL NOT NULL, "name" text NOT NULL, "track_name" text NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "minio_data_path" text NOT NULL, "userId" integer, CONSTRAINT "UQ_345ccb0d2062f9623dd346a716f" UNIQUE ("track_name"), CONSTRAINT "PK_ef9ed7160ea69013636466bf2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_bd0eee09c3dde57cc3b9ac1512a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_bd0eee09c3dde57cc3b9ac1512a"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "models"`);
    }

}
