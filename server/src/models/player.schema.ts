import { z } from "zod";

export const playerSchema = z.object({
  ffeId: z
    .string({
      required_error: "N° FFE requis.",
      invalid_type_error: "N° FFE invalide.",
    })
    .regex(/^[A-Z]\d+/, "Le n° FFE doit être composé d'une lettre majuscule suivie d'un nombre."),
  fideId: z
    .number({ invalid_type_error: "N° FIDE invalide." })
    .int("Le n° FIDE ne peut être un nombre décimal.")
    .nonnegative("Le n° FIDE ne peut pas être un nombre négatif.")
    .optional(),
  firstName: z
    .string({
      required_error: "Prénom requis.",
      invalid_type_error: "Prénom invalide."
    })
    .nonempty("Prénom requis."),
  lastName: z
    .string({
      required_error: "Nom de famille requis.",
      invalid_type_error: "Nom de famille invalide."
    })
    .nonempty("Nom de famille requis."),
  email: z
    .string({
      required_error: "Email requis.",
      invalid_type_error: "Email invalide."
    })
    .email("Email invalide."),
  role: z.union([
    z.literal("WEBMASTER"),
    z.literal("ADMIN"),
    z.literal("CAPTAIN"),
    z.literal("USER")
  ], {
    invalid_type_error: "Rôle invalide.",
    required_error: "Rôle requis."
  }),
  phone1: z
    .string({ invalid_type_error: "N° de téléphone invalide." })
    .optional(),
  phone2: z
    .string({ invalid_type_error: "N° de téléphone invalide." })
    .optional(),
  birthDate: z
    .string({ invalid_type_error: "Date de naissance invalide." })
    .transform((dateStr) => new Date(dateStr))
    .optional(),
  rating: z
    .number({ invalid_type_error: "Classement Elo invalide." })
    .nonnegative("Le classement Elo doit être un nombre positif.")
    .optional(),
  team1: z.string({ invalid_type_error: "Nom d'équipe invalide" }).optional(),
  team2: z.string({ invalid_type_error: "Nom d'équipe invalide" }).optional(),
  membership: z.string({ invalid_type_error: "Type d'adhérent invalide" }).optional(),
  isMale: z.boolean().optional()
});

export const updateSchema = playerSchema
  .pick({
    fideId: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    phone1: true,
    phone2: true,
    birthDate: true,
    rating: true,
    isMale: true,
    isAdmin: true,
    isCaptain: true
  })
  .partial();