import { z } from "zod";

const lineUpItemsSchema = [...Array(8).keys()].reduce((acc, key) => {
  const board = +key + 1;
  acc[board] = z
    .object({
      ffeId: z.string({
        required_error: `éch. ${board} : N° FFE requis.`,
        invalid_type_error: `éch. ${board} : N° FFE invalide.`
      }),
      rating: z.number({
        invalid_type_error: `éch. ${board} : Elo invalide.`,
        required_error: `éch. ${board} : Elo requis.`,
      }),
      name: z.string({
        invalid_type_error: `éch. ${board} : Nom du joueur invalide.`,
        required_error: `éch. ${board} : Nom du joueur requis.`,
      })
    })
    .nullable();
  return acc;
}, {} as Record<number, z.ZodNullable<LineUpSchema>>);

export const newMatchSchema = z.object({
  season: z
    .number({
      invalid_type_error: "Saison invalide.",
      required_error: "Saison requise."
    })
    .int("Saison invalide."),
  round: z
    .number({
      invalid_type_error: "Ronde invalide.",
      required_error: "Ronde requise."
    })
    .int("Ronde invalide."),
  teamName: z.string({
    required_error: "Nom d'équipe requis.",
    invalid_type_error: "Nom d'équipe invalide."
  }),
  whiteOnOdds: z.boolean({
    invalid_type_error: "Veuillez renseigner qui a les blancs sur les échiquiers impairs.",
    required_error: "Veuillez renseigner qui a les blancs sur les échiquiers impairs."
  }),
  opponent: z.string({
    required_error: "Nom de l'adversaire requis.",
    invalid_type_error: "Nom de l'adversaire invalide."
  }),
  address: z
    .string({
      required_error: "Adresse requise.",
      invalid_type_error: "Adresse invalide."
    })
    .nonempty("Adresse requise."),
  city: z
    .string({
      required_error: "Ville requise.",
      invalid_type_error: "Ville invalide."
    })
    .nonempty("Ville requise."),
  zipCode: z
    .string({
      required_error: "Code postal requis.",
      invalid_type_error: "Code posta invalide."
    })
    .nonempty("Code postal requis."),
  date: z
    .string({
      invalid_type_error: "Date invalide.",
      required_error: "Date requise."
    })
    .transform((dateStr) => new Date(dateStr)),
  lineUp: z.object(lineUpItemsSchema, {
    invalid_type_error: "Composition invalide.",
    required_error: "Composition requise."
  }),
  captainFfeId: z
    .string({ invalid_type_error: "N° FFE du capitaine invalide." })
    .nullable()
});

export const updateMatchSchema = newMatchSchema.partial();

type LineUpSchema = z.ZodObject<{
  ffeId: z.ZodString;
  rating: z.ZodNumber;
  name: z.ZodString;
}>;