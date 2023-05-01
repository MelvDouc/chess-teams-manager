import { FreeJSX, Observable } from "reactfree-jsx";
import { Player } from "@src/types.js";
import cssClasses from "./PlayersTable.module.scss";

export default function PlayersTableRow({ player, update }: {
  player: Player;
  update: (player: Player) => Promise<boolean>;
}) {
  const editMode = new Observable<FreeJSX.FreeJsxHTMLElement["contentEditable"]>("false");
  const playerObs = new Observable(structuredClone(player));

  const toggleButton = (
    <button className="btn btn-primary" onclick={() => {
      editMode.value = (editMode.value === "false") ? "true" : "false";
    }}>
      <i className="bi bi-pencil-fill"></i>
    </button>
  );
  const validateButton = (
    <button className="btn btn-success" onclick={async () => {
      if (!(await update(playerObs.value)))
        return alert("Le joueur n'a pu être modifié.");

      editMode.value = "false";
    }}>
      <i className="bi bi-check-lg"></i>
    </button>
  );
  const cancelButton = (
    <button className="btn btn-danger" onclick={() => {
      editMode.value = "false";
      playerObs.value = structuredClone(player);
    }}>
      <i className="bi bi-x-lg"></i>
    </button>
  );

  return (
    <tr className={cssClasses.playersTableRow} data-edit-mode={editMode}>
      <td>{player.ffeId}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          const fideId = +(target as HTMLElement).innerText;
          playerObs.value.fideId = isNaN(fideId) ? null : fideId;
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = String(player.fideId));
        }}
      >{player.fideId}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          playerObs.value.lastName = (target as HTMLElement).innerText.toUpperCase();
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = player.lastName);
        }}
      >{player.lastName}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          playerObs.value.firstName = (target as HTMLElement).innerText;
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = player.firstName);
        }}
      >{player.firstName}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          playerObs.value.email = (target as HTMLElement).innerText;
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = player.email);
        }}
      >{player.email}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          playerObs.value.phone = (target as HTMLElement).innerText;
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = player.phone ?? "");
        }}
      >{player.phone}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          const rating = +(target as HTMLElement).innerText;
          player.rating = rating || 0;
        }}
        $init={(element) => {
          playerObs.subscribe((player) => element.innerText = String(player.rating));
        }}
      >{player.rating}</td>
      <td className={cssClasses.actionsCell}>
        <div
          $init={(element) => {
            editMode.subscribe((mode) => {
              if (mode === "true")
                element.replaceChildren(validateButton, cancelButton);
              else
                element.replaceChildren(toggleButton);
            });
          }}
        >{toggleButton}</div>
      </td>
    </tr>
  );
}