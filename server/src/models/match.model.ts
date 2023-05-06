import { z } from "zod";
import { collections } from "../database/db.js";
import { DeleteResult, InsertOneResult, Match, UpdateFilter, UpdateResult, WithId } from "../types.js";

const matchesPipeline = [
  {
    $sort: {
      date: 1,
    },
  },
  {
    $group: {
      _id: "$teamName",
      matches: {
        $push: "$$ROOT",
      },
    },
  },
  {
    $project: {
      teamName: "$_id",
      matches: 1,
      _id: 0,
    },
  },
  {
    $sort: {
      teamName: 1,
    },
  },
];

const lineUpSchema = z.object(
  [...Array(8).keys()].reduce((acc, key) => {
    acc[+key] = z
      .object({
        ffeId: z.string({ required_error: "N° FFE requis." }),
        rating: z.number().positive(),
        name: z.string()
      })
      .nullable();
    return acc;
  }, {} as Record<number, z.ZodNullable<LineUpSchema>>)
);

const newMatchSchema = z.object({
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
      invalid_type_error: "Adresse invalide"
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
    .date({
      invalid_type_error: "Date invalide.",
      required_error: "Date requise."
    })
    .transform((dateStr) => new Date(dateStr)),
  lineUp: lineUpSchema,
  captainFfeId: z
    .string({
      invalid_type_error: "N° FFE du capitaine invalide.",
      required_error: "N° FFE du capitaine requis."
    })
    .regex(/[A-Z]\d+/, "N° FFE du capitaine invalide.")
    .nullable()
});

const updateMatchSchema = newMatchSchema.partial();

function getMatch(filter: MatchFilter): Promise<WithId<Match> | null> {
  return collections.matches.findOne(filter);
}

function getMatches(season: number): Promise<MatchesByTeamName[]> {
  return collections.matches
    .aggregate([
      {
        $match: { season },
      },
      ...matchesPipeline,
    ])
    .toArray() as Promise<MatchesByTeamName[]>;
}

function getSeasons(): Promise<number[]> {
  return collections.matches.distinct("season");
}

function createMatch(data: Match): Promise<InsertOneResult<Match>> {
  return collections.matches.insertOne(data);
}

function updateMatch(filter: MatchFilter, updates: UpdateFilter<Match>): Promise<UpdateResult<Match>> {
  return collections.matches.updateOne(filter, updates as any);
}

function deleteMatch(filter: MatchFilter): Promise<DeleteResult> {
  return collections.matches.deleteOne(filter);
}

export default {
  getMatch,
  getMatches,
  getSeasons,
  createMatch,
  updateMatch,
  deleteMatch,
  parseNewMatch: (data: Match): [Match, null] | [null, string[]] => {
    const parsed = newMatchSchema.safeParse(data);
    return (parsed.success)
      ? [parsed.data, null]
      : [null, parsed.error.errors.map((e) => e.message)];
  },
  parseMatchUpdates: (data: Match): [Partial<Match>, null] | [null, string[]] => {
    const parsed = updateMatchSchema.safeParse(data);
    return (parsed.success)
      ? [parsed.data, null]
      : [null, parsed.error.errors.map((e) => e.message)];
  },
};

type MatchFilter = Partial<WithId<Match>>;
type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: WithId<Match>[];
};
type LineUpSchema = z.ZodObject<{
  ffeId: z.ZodString;
  rating: z.ZodNumber;
  name: z.ZodString;
}>;