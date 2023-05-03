import { FreeJSX, Observable } from "reactfree-jsx";
import LineUpTablePlayerNameCell from "./LineUpTablePlayerNameCell.jsx";
import LineUpTableRatingCell from "./LineUpTableRatingCell.jsx";
import LineUpTableCaptainFfeIdInput from "./LineUpTableCaptainFfeIdInput.jsx";
import LineUpTableFfeIdCell from "./LineUpTableFfeIdCell.jsx";
import { PropertyAccessors } from "@src/utils/create-accessors.js";
import { Match, Player } from "@src/types.js";

export default function LineUpTable({ whiteOnOddsObs, lineUpAccessors, captainFfeIdAccessors, players }: {
  whiteOnOddsObs: FreeJSX.Obs<Match["whiteOnOdds"]>;
  lineUpAccessors: PropertyAccessors<Match, "lineUp">;
  captainFfeIdAccessors: PropertyAccessors<Match, "captainFfeId">;
  players: Player[];
}): HTMLTableElement {
  const lineUpObs = new Observable(lineUpAccessors.get());
  const fullNamesByFfeId = new Map<string, string>();
  const playersByFullName = players.reduce((acc, player) => {
    const fullName = `${player.firstName} ${player.lastName}`;
    fullNamesByFfeId.set(player.ffeId, fullName);
    return acc.set(fullName, player);
  }, new Map<string, Player>());

  const setPlayerFullName = (name: string, board: number) => {
    if (!name) {
      lineUpObs.value[board] = null;
      return lineUpObs.notify();
    }

    const player = playersByFullName.get(name);
    lineUpObs.value[board] = {
      ffeId: player?.ffeId ?? "",
      name,
      rating: player?.rating ?? 1199,
    };
    lineUpObs.notify();
  };

  const setFfeId = (ffeId: string, board: number) => {
    if (lineUpObs.value[board])
      lineUpObs.value[board]!.ffeId = ffeId;
    else {
      const name = fullNamesByFfeId.get(ffeId);
      lineUpObs.value[board] = {
        ffeId,
        name: name ?? "",
        rating: playersByFullName.get(name!)?.rating ?? 1199
      };
    }
    lineUpObs.notify();
  };

  lineUpObs.subscribe(lineUpAccessors.set);

  return (
    <table className="table table-warning table-striped table-hover">
      <thead>
        <tr>
          <th>Éch.</th>
          <th>Prénom NOM</th>
          <th>N° FFE</th>
          <th>Elo</th>
          <th>Capitaine</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(lineUpObs.value).map(([board, player]) => (
          <tr>
            <td>{board}{whiteOnOddsObs.map((value) => ((+board % 2 === 1) === value) ? "B" : "N")}</td>
            <td>
              <LineUpTablePlayerNameCell
                playerFullName={player?.name ?? ""}
                setPlayerFullName={(name) => setPlayerFullName(name, +board)}
              />
            </td>
            <td>
              <LineUpTableFfeIdCell
                ffeId={player?.ffeId ?? ""}
                setFfeId={(ffeId) => setFfeId(ffeId, +board)}
                onFfeIdChange={(subscription) => lineUpObs.subscribe((value) => {
                  subscription(value[+board]?.ffeId ?? "");
                })}
              />
            </td>
            <td>
              <LineUpTableRatingCell
                rating={player?.rating || 0}
                setRating={(rating) => {
                  if (lineUpObs.value[+board])
                    lineUpObs.value[+board]!.rating = rating;
                  lineUpObs.notify();
                }}
                onRatingChange={(subscription) => {
                  lineUpObs.subscribe((value) => {
                    subscription(value[+board]?.rating || 0);
                  });
                }}
              />
            </td>
            <td>
              <LineUpTableCaptainFfeIdInput
                getFfeId={() => lineUpObs.value[+board]?.ffeId ?? null}
                captainFfeIdAccessors={captainFfeIdAccessors}
              />
            </td>
          </tr>
        ))}
        <datalist id="players-datalist">
          {[...fullNamesByFfeId.values()].map((fullName) => (
            <option value={fullName}>{fullName}</option>
          ))}
        </datalist>
      </tbody>
    </table>
  );
}