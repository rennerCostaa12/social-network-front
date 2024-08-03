import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const FormSchemaRegister = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }),
  username: z.string({ required_error: "Nome de usuário é obrigatório" }),
  gender: z.string({ required_error: "Gênero é obrigatório" }),
  password: z.string({ required_error: "Senha é obrigatório" }).min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  image_profile: z
    .any()
    .refine((files) => files?.length == 1, "Foto de perfil é obrigatório")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp somente esses tipos de imagem é aceito."
    ),
});
