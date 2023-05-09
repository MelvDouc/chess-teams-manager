import DeletePlayerButton from "./DeletePlayerButton.jsx";
import router from "@src/router.jsx";
import { Player } from "@src/types.js";

export default class PlayersTableRow extends HTMLTableRowElement {
  public static clearCache: VoidFunction;

  public readonly player: Player & { index: number; };

  constructor({ player, canEdit, canDelete }: {
    player: Player & { index: number; };
    canEdit: boolean;
    canDelete: boolean;
  }) {
    super();
    this.player = player;

    this.append(<>
      <td>{player.ffeId}</td>
      <td>{player.fideId}</td>
      <td>{player.lastName}</td>
      <td>{player.firstName}</td>
      <td>{player.email}</td>
      <td>{player.phone1}</td>
      <td>{player.rating}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center gap-2">
          {canEdit && (
            <router.link to={`/joueurs/${player.ffeId}/modifier`} className="btn btn-primary" title="Modifier">
              <i className="bi bi-pen-fill"></i>
            </router.link>
          )}
          {canDelete && (
            <DeletePlayerButton ffeId={player.ffeId} clearCache={PlayersTableRow.clearCache} />
          )}
        </div>
      </td>
    </>);
  }
}

customElements.define("players-table-tr", PlayersTableRow, { extends: "tr" });