import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Gender } from "@shared/utils/gender.enum";

@Entity("patients")
class Patient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column({ type: "date" })
  email: string;

  @Column({ type: "date" })
  birth_date: string;

  @Column({ type: "enum", enum: Gender })
  gender: string;

  @Column()
  height: number;

  @Column()
  weight: number;

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
