import { update } from "@src/utils/api.js";
import PlayersTableRow from "./PlayersTableRow.jsx";
import { Player } from "@src/types.js";

export default function PlayersTable({ players, clearCache }: {
  players: Player[];
  clearCache: VoidFunction;
}) {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr className="bg-primary text-light">
          <th>N° FFE</th>
          <th>N° FIDE</th>
          <th>NOM</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Tél</th>
          <th>Elo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <PlayersTableRow
            player={player}
            update={async (player) => {
              const updateResult = await update(`/players/${player.ffeId}/update`, player);
              console.log(updateResult);
              if (updateResult?.acknowledged === true)
                clearCache();
              return updateResult?.acknowledged === true;
            }}
          />
        ))}
      </tbody>
    </table>
  );
}