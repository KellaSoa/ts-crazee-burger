import z from "zod";

export const loginFormValidator = z
  .string()
  .min(2, "Le prénom doit contenir au moins 2 caractères")
  .max(30, "Le prénom ne peut pas dépasser 30 caractères")
  .regex(
    /^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/,
    "Le prénom ne peut contenir que des lettres, des espaces, des tirets et des apostrophes."
  )
  .nonempty("Veillez entrer votre prénom");
