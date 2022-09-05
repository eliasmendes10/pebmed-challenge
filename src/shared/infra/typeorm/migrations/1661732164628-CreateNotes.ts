import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotes1661732164628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "note", type: "text" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "patient_id", type: "uuid", isNullable: true },
        ],

        foreignKeys: [
          {
            name: "FKNotesPatient",
            referencedTableName: "patients",
            referencedColumnNames: ["id"],
            columnNames: ["patient_id"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notes");
  }
}
