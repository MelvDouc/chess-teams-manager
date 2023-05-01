import { FreeJSX, Observable } from "reactfree-jsx";
import LineUpTablePlayerSelect from "./LineUpTablePlayerSelect.jsx";
import LineUpTableRatingElement from "./LineUpTableRatingElement.jsx";
import LineUpTableCaptainFfeIdInput from "./LineUpTableCaptainFfeIdInput.jsx";
import { PropertyAccessors } from "@src/utils/create-accessors.js";
import { Match, Player } from "@src/types.js";
import cssClasses from "./styles.module.scss";

export default function LineUpTable({ whiteOnOddsObs, lineUpAccessors, captainFfeIdAccessors, players }: {
  whiteOnOddsObs: FreeJSX.Obs<Match["whiteOnOdds"]>;
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
            <td>
              <div
                className={cssClasses.ffeIdElement}
                contentEditable="true"
                oninput={({ target }) => {
                  if (lineUpObs.value[+board])
                    lineUpObs.value[+board]!.ffeId = (target as HTMLElement).innerText;
                }}
                $init={(element) => {
                  lineUpObs.subscribe((value) => {
                    element.innerText = value[+board]?.ffeId ?? "";
                  });
                }}
              >{lineUpObs.value[+board]?.ffeId}</div>
            </td>
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