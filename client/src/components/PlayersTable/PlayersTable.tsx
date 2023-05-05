import { Observable } from "reactfree-jsx";
import { Player } from "@src/types.js";
import PlayersTableRow from "./PlayersTableRow.jsx";
import PlayersTableTHeader from "./PlayersTableTHeader.jsx";

export default function PlayersTable({ players, clearCache }: {
  players: Player[];
  clearCache: VoidFunction;
}): HTMLTableElement {
  const sortFnObs = new Observable<((a: PlayersTableRow["player"], b: PlayersTableRow["player"]) => number) | null>();
  const Th = PlayersTableTHeader({ sortFnObs });
  const rowsObs = new Observable(players.map((player, index) => (
    new PlayersTableRow({ player: { ...player, index } })
  )));

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
      <tbody $init={(element) => {
        rowsObs.subscribe((rows) => {
          rows.forEach((row) => element.appendChild(row));
        });
      }}>{rowsObs.value}</tbody>
    </table>
  );
}
