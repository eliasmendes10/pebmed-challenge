import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Patient } from "../../../../patients/infra/typeorm/entities/Patient";

@Entity("schedules")
class Schedule {
  @PrimaryColumn()
  id: string;

  @Column({ type: "date" })
  time: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Schedule };
