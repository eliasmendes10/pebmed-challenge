import { IsNotEmpty } from "class-validator";

class IScheduleDTO {
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  patient_id: string;
  id?: string;
}

export { IScheduleDTO };
