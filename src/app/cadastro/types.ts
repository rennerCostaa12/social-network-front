import { z } from "zod";
import { FormSchemaRegister } from "./schema";

export type TypeFormSchemaRegister = z.infer<typeof FormSchemaRegister>;

export interface DataRegisterUserProps {
  name: string;
  username: string;
  gender: string;
  description: null;
  password: string;
  photo_profile: string;
}
