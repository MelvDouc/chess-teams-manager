import PlayerForm from "@components/PlayerForm/PlayerForm.jsx";
import { getPlayer, updatePlayer } from "@utils/api.js";
import { DbEntities } from "@types";

export default async function PlayerUpdatePage({ ffeId }: { ffeId: string; }) {
  const player = await getPlayer(ffeId);

  return (
    <>
      <h2>Modifier {ffeId}</h2>
      <div className="container-sm">
        <PlayerForm
          player={player!}
          handleSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const updates = getUpdates(player!, formData);
            const update = await updatePlayer(ffeId, updates);

            if (!update?.affectedRows)
              return alert("Le joueur n'a pu être modifié.");

            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}

function getUpdates(player: DbEntities.Player, formData: FormData): Partial<DbEntities.Player> {
  const updates = {} as Partial<DbEntities.Player>;

  if (player.ffe_id !== formData.get("ffe_id"))
    updates.ffe_id = formData.get("ffe_id") as string;

  return updates;
}