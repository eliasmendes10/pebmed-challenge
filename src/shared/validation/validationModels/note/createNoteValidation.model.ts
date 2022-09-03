import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteValidationModel {
  @IsString({ message: "Observação inválida" })
  @IsNotEmpty({ message: "Observação é obrigatória" })
  note: string;

  @IsNotEmpty({ message: "Paciente é obrigatório" })
  @IsString({ message: "Paciente inválido" })
  patient_id: string;
}
