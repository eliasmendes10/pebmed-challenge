import { Gender } from "@shared/utils/gender.enum";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreatePatientValidationModel {
  @IsString({ message: "Nome inválido" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  name: string;

  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "Email é obrigatório" })
  email: string;

  @IsString({ message: "Telefone inválido" })
  @IsNotEmpty({ message: "Telefone é obrigatório" })
  phone_number: string;

  @IsDateString({}, { message: "Data de nascimento inválida" })
  @IsNotEmpty({ message: "Data de nascimento é obrigatória" })
  birth_date: Date;

  @IsEnum(Gender, { message: "Sexo inválido" })
  @IsNotEmpty({ message: "Sexo é obrigatório" })
  gender: string;

  @IsNumber({}, { message: "Altura no formato inválido" })
  @IsNotEmpty({ message: "Altura é obrigatória" })
  height: number;

  @IsNumber({}, { message: "Peso no formato inválido" })
  @IsNotEmpty({ message: "Peso é obrigatório" })
  weight: number;
}
