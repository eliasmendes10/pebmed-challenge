import { IsNotEmpty } from "class-validator";

class INoteDTO {
  @IsNotEmpty()
  note: string;
  @IsNotEmpty()
  patient_id: string;
  id?: string;
}

export { INoteDTO };
