import { ObjectId } from "mongo";
import { isNonEmptyString } from "/models/validators.ts";
import db from "/database/db.ts";
import { DbEntities } from "/types.ts";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "short",
  timeStyle: "short"
});

function getMatch(filter: Partial<DbEntities.Match>) {
  return db.matches.findOne(filter);
}

function getSeasons() {
  return db.matches.distinct("season") as Promise<number[]>;
}

function getMatchesOfSeason(season: number) {
  return db.matches
    .aggregate<{ teamName: string; matches: DbEntities.Match[]; }>([
      {
        $match: { season }
      },
      {
        $group: {
          _id: "$teamName",
          matches: { $push: "$$ROOT" }
        }
      },
      {
        $addFields: { teamName: "$_id" }
      },
      {
        $project: { _id: 0 }
      },
      {
        $sort: { teamName: 1 }
      }
    ])
    .map(({ teamName, matches }) => ({
      teamName,
      matches: matches.map(({ date, ...others }) => ({ ...others, date: dateFormatter.format(date) }))
    }));
}

async function getLineUp(matchDetail: Partial<DbEntities.Match>) {
  const match = await getMatch(matchDetail);

  if (!match) {
    return Array.from({ length: 8 }, (_, i) => {
      const board = i + 1;
      return { board, color: "", player: null };
    });
  }

  const ffeIds = match.lineUp.map(element => element.ffeId);
  const players = await db.players.find({ ffeId: { $in: ffeIds } }).toArray();

  return Array.from({ length: 8 }, (_, i) => {
    const board = i + 1;
    const ffeIdIndex = match.lineUp.findIndex(element => element.board === board);

    return {
      board,
      color: ((board % 2 === 1) === match.whiteOnOdds) ? "B" : "N",
      player: (ffeIdIndex === -1) ? null : players.find(p => p.ffeId === ffeIds[ffeIdIndex])!
    };
  });
}

function createMatch(data: DbEntities.Match) {
  return db.matches.insertOne(data);
}

function updateMatch(objectId: ObjectId, updates: DbEntities.Match) {
  return db.matches.updateOne({ _id: objectId }, {
    $set: updates
  });
}

function deleteMatch(id: string) {
  return db.matches.deleteOne({ _id: new ObjectId(id) });
}

function getMatchErrors(match: DbEntities.Match) {
  const errors: string[] = [];

  if (isNaN(match.season))
    errors.push("Saison invalide.");

  if (isNaN(match.round))
    errors.push("Ronde invalide.");

  if (!isNonEmptyString(match.teamName))
    errors.push("Nom d'équipe requis.");

  if (!isNonEmptyString(match.address))
    errors.push("Adresse requise.");

  if (!isNonEmptyString(match.opponent))
    errors.push("Adversaire requis.");

  if (isNaN(new Date(match.date).getTime()))
    errors.push("Date invalide.");

  return errors;
}

export default {
  getMatch,
  getSeasons,
  getMatchesOfSeason,
  getLineUp,
  createMatch,
  updateMatch,
  deleteMatch,
  getMatchErrors,
};