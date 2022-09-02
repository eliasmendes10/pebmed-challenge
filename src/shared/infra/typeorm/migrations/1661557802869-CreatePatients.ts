import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatients1661557802869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "patients",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "name", type: "varchar" },
          { name: "phone_number", type: "varchar" },
          { name: "email", type: "varchar" },
          { name: "birth_date", type: "date" },
          {
            name: "gender",
            type: "enum",
            enum: ["Masculino", "Feminino", "Prefiro não informar"],
            isNullable: true,
          },
          { name: "height", type: "varchar" },
          { name: "weight", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("patients");
  }
}
