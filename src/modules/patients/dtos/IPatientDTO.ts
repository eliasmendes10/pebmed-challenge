import { IsNotEmpty, IsEmail } from "class-validator";

class IPatientDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone_number: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  birth_date: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  height: string;
  @IsNotEmpty()
  weight: string;
  id?: string;
}

export { IPatientDTO };
