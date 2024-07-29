import { z } from "zod";

export const FormSchema = z.object({
  username: z.string().nonempty("O nome de usuário é obrigatório"),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});
