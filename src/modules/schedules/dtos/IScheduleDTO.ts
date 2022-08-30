import { IsNotEmpty, IsDateString } from "class-validator";

class IScheduleDTO {
  @IsNotEmpty()
  @IsDateString()
  time: Date;
  @IsNotEmpty()
  patient_id: string;
  id?: string;
}

export { IScheduleDTO };
