import { FreeJSX, Observable } from "reactfree-jsx";
import { Player } from "@src/types.js";
import cssClasses from "./PlayersTable.module.scss";

const resetEvent = new CustomEvent("row_reset");

export default function PlayersTableRow({ player, update }: {
  player: Player;
  update: (player: Partial<Player>) => Promise<boolean>;
}) {
  const editMode = new Observable<FreeJSX.FreeJsxHTMLElement["contentEditable"]>("false");
  const updates: Partial<Player> = {};
  let row: HTMLTableRowElement;

  const toggleButton = ToggleButton(() => {
    editMode.value = (editMode.value === "false") ? "true" : "false";
  });
  const validateButton = ValidateButton(async () => {
    if (!(await update(updates)))
      return alert("Le joueur n'a pu être modifié.");

    editMode.value = "false";
  });
  const cancelButton = CancelButton(() => {
    editMode.value = "false";
    row.dispatchEvent(resetEvent);
  });

  return row = (
    <tr
      className={cssClasses.playersTableRow}
      data-edit-mode={editMode}
      $init={(element) => {
        element.addEventListener(resetEvent.type, () => {
          for (const cell of element.cells)
            if (cell.dataset.key)
              cell.innerText = (player[cell.dataset.key as keyof Player] as Extract<Player, string>) ?? "";
        });
      }}
    >
      <td>{player.ffeId}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          const fideId = +(target as HTMLElement).innerText;
          updates.fideId = isNaN(fideId) ? null : fideId;
        }}
        data-key="fideId"
      >{player.fideId}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          updates.lastName = (target as HTMLElement).innerText.toUpperCase();
        }}
        data-key="lastName"
      >{player.lastName}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          updates.firstName = (target as HTMLElement).innerText;
        }}
        data-key="firstName"
      >{player.firstName}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          updates.email = (target as HTMLElement).innerText;
        }}
        data-key="email"
      >{player.email}</td>
      <td
        contentEditable={editMode}
        oninput={({ target }) => {
          updates.phone = (target as HTMLElement).innerText;
        }}
        data-key="phone"
      >{player.phone}</td>
      <td
        contentEditable={editMode}
        data-key="rating"
        oninput={({ target }) => {
          const rating = +(target as HTMLElement).innerText;
          updates.rating = rating || 0;
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

function ToggleButton(onclick: VoidFunction) {
  return (
    <button className="btn btn-primary" onclick={onclick}>
      <i className="bi bi-pencil-fill"></i>
    </button>
  );
}

function ValidateButton(onclick: () => void | Promise<void>) {
  return (
    <button className="btn btn-success" onclick={onclick}>
      <i className="bi bi-check-lg"></i>
    </button>
  );
}

function CancelButton(onclick: VoidFunction) {
  return (
    <button className="btn btn-danger" onclick={onclick}>
      <i className="bi bi-x-lg"></i>
    </button>
  );
}