import { Observable } from "reactfree-jsx";
import PlayersTableRow from "./PlayersTableRow.jsx";
import PlayersTableTHeader from "./PlayersTableTHeader.jsx";
import CreateTextFilter from "./CreateTextFilter.jsx";
import { Player, PlayerData } from "@src/types.js";
import RoleIndex from "@src/utils/RoleIndex.js";
import cssClasses from "./PlayersTable.module.scss";

export default function PlayersTable({ players, clearCache, userData }: {
  players: Player[];
  clearCache: VoidFunction;
  userData: PlayerData;
}): HTMLTableElement {
  const isWebmaster = userData?.role === "WEBMASTER";
  const rowsObs = new Observable(players.map((player, index) => (
    new PlayersTableRow({
      player: { ...player, index },
      canEdit: isWebmaster || RoleIndex[userData.role] > RoleIndex[player.role],
      canDelete: isWebmaster
    })
  )));

  const filtersObs = new Observable<Map<symbol, ((player: Player) => boolean)>>(new Map());
  filtersObs.subscribe((filterMap) => {
    rowsObs.value.forEach((row) => {
      for (const filter of filterMap.values()) {
        if (!filter(row.player))
          return row.classList.add("d-none");
      }

      row.classList.remove("d-none");
    });
  });
  const TextFilter = CreateTextFilter(filtersObs);

  const sortFnObs = new Observable<((a: PlayersTableRow["player"], b: PlayersTableRow["player"]) => number) | null>();
  const Th = PlayersTableTHeader({ sortFnObs });

  PlayersTableRow.clearCache = clearCache;
  sortFnObs.subscribe((sortFn) => {
    rowsObs.value.sort(
      sortFn
        ? (a, b) => sortFn(a.player, b.player)
        : (a, b) => a.player.index - b.player.index
    );
    rowsObs.notify();
  });

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr className="bg-primary text-light">
          <Th text="N° FFE" sortFn={(a, b) => a.ffeId.localeCompare(b.ffeId)} />
          <Th text="N° FIDE" sortFn={(a, b) => (a.fideId ?? Infinity) - (b.fideId ?? Infinity)} />
          <Th text="NOM" sortFn={(a, b) => a.lastName.localeCompare(b.lastName)} />
          <Th text="Prénom" sortFn={(a, b) => a.firstName.localeCompare(b.firstName)} />
          <Th text="Email" sortFn={(a, b) => a.email.localeCompare(b.email)} />
          <Th text="Tél." sortFn={(a, b) => (a.phone1 ?? "").localeCompare(b.phone1 ?? "")} />
          <Th text="Elo" sortFn={(a, b) => (a.rating ?? 0) - (b.rating ?? 0)} />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={cssClasses.playersTableFilters}>
        <tr>
          <td>
            <TextFilter filter={({ ffeId }, value) => ffeId.toLowerCase().includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ fideId }, value) => fideId !== undefined && String(fideId).includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ lastName }, value) => lastName.toLowerCase().includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ firstName }, value) => firstName.toLowerCase().includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ email }, value) => email.toLowerCase().includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ phone1 }, value) => phone1 !== undefined && phone1.toLowerCase().includes(value)} />
          </td>
          <td>
            <TextFilter filter={({ rating }, value) => rating !== undefined && String(rating).includes(value)} />
          </td>
          <td>
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-warning"
                title="Réinitialiser les filtres"
                onclick={() => {
                  filtersObs.value.clear();
                  filtersObs.notify();
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody $init={(element) => {
        rowsObs.subscribe((rows) => {
          rows.forEach((row) => element.appendChild(row));
        });
      }}>{rowsObs.value}</tbody>
    </table>
  );
}
