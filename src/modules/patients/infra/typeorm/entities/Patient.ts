import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("patients")
class Patient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column()
  gender: string;

  @Column()
  height: string;

  @Column()
  weight: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Patient };
