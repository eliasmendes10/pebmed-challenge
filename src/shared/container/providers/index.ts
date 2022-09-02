import { IValidator } from "@shared/validation/interfaces/validator.interface";
import { Validator } from "@shared/validation/validator";
import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IValidator>("Validator", Validator);
