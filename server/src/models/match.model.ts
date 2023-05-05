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

const newMatchSchema = z.object({
  season: z.number({ invalid_type_error: "Saison invalide.", required_error: "Saison requise." }).int(),
  round: z.number({ invalid_type_error: "Ronde invalide.", required_error: "Saison requise." }).int(),
  teamName: z.string({ required_error: "Nom de l'équipe requis." }),
  whiteOnOdds: z.boolean(),
  opponent: z.string({ required_error: "Nom de l'adversaire requis." }),
  address: z.string({ required_error: "Adresse requise." }),
  city: z.string({ required_error: "Ville requise." }),
  zipCode: z.string({ required_error: "Code postal requis." }),
  date: z.string().datetime("Date invalide."),
  captainFfeId: z.string().regex(/[A-Z]\d+/, "N° FFE du capitaine invalide.").nullable()
});

const updateMatchSchema = newMatchSchema.optional();

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
  getCreateErrors: (data: Match) => {
    const parsed = newMatchSchema.safeParse(data);
    return (parsed.success)
      ? null
      : parsed.error.errors.map((e) => e.message);
  },
  getUpdateErrors: (data: Match) => {
    const parsed = updateMatchSchema.safeParse(data);
    return (parsed.success)
      ? null
      : parsed.error.errors.map((e) => e.message);
  },
};

type MatchFilter = Partial<WithId<Match>>;
type MatchesByTeamName = Pick<Match, "teamName"> & {
  matches: WithId<Match>[];
};
