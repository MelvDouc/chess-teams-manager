import { Observable } from "reactfree-jsx";
import LineUpTablePlayerSelect from "./LineUpTablePlayerSelect.jsx";
import LineUpTableRatingElement from "./LineUpTableRatingElement.jsx";
import LineUpTableCaptainFfeIdInput from "./LineUpTableCaptainFfeIdInput.jsx";
import { PropertyAccessors } from "@src/utils/create-accessors.js";
import { Match, Player } from "@src/types.js";

export default function LineUpTable({ whiteOnOddsObs, lineUpAccessors, captainFfeIdAccessors, players }: {
  whiteOnOddsObs: Obs<Match["whiteOnOdds"]>;
  lineUpAccessors: PropertyAccessors<Match, "lineUp">;
  captainFfeIdAccessors: PropertyAccessors<Match, "captainFfeId">;
  players: Player[];
}) {
  const lineUpObs = new Observable(lineUpAccessors.get());
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
              <LineUpTablePlayerSelect
                board={+board}
                players={players}
                lineUpObs={lineUpObs}
              >
                <option value="">--</option>
                {players.map((p) => (
                  <option
                    value={p.ffeId}
                    selected={p.ffeId === player?.ffeId}
                  >{p.firstName} {p.lastName}</option>
                ))}
              </LineUpTablePlayerSelect>
            </td>
            <td>{lineUpObs.map((lineUp) => lineUp[+board]?.ffeId ?? "")}</td>
            <td>
              <LineUpTableRatingElement board={+board} lineUpObs={lineUpObs} />
            </td>
            <td>
              <LineUpTableCaptainFfeIdInput
                getFfeId={() => lineUpObs.value[+board]?.ffeId ?? null}
                captainFfeIdAccessors={captainFfeIdAccessors}
              />
            </td>
          </tr>
        ))}
        <datalist id="players-datalist" onclick={console.log}>
          {players.map(({ firstName, lastName }) => (
            <option value={`${firstName} ${lastName}`}>{firstName} {lastName}</option>
          ))}
        </datalist>
      </tbody>
    </table>
  );
}