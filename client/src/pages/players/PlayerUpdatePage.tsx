import PlayerForm from "@src/components/PlayerForm/PlayerForm.jsx";
import { getPlayer, updatePlayer } from "@src/utils/api.js";
import { DbEntities } from "@src/types.js";

export default async function PlayerUpdatePage({ ffeId }: { ffeId: string; }) {
  const player = (await getPlayer(ffeId))!;

  return (
    <>
      <h2>Modifier {ffeId}</h2>
      <div className="container-sm">
        <PlayerForm
          player={player}
          handleSubmit={async (e) => {
            e.preventDefault();
            const formData = Object.entries([...new FormData(e.target as HTMLFormElement)]) as unknown as DbEntities.Player;
            const updates = {} as Partial<DbEntities.Player>;

            if (formData.ffe_id && formData.ffe_id !== player.ffe_id)
              updates.ffe_id = formData.ffe_id;
            updates.fide_id = (!formData.fide_id || isNaN(+formData.fide_id)) ? null : +formData.fide_id;
            if (formData.last_name && formData.last_name !== player.last_name)
              updates.last_name = formData.last_name;
            if (formData.first_name && formData.first_name !== player.first_name)
              updates.first_name = formData.first_name;
            if (formData.email && formData.email !== player.email)
              updates.email = formData.email;
            if (formData.phone !== player.phone)
              updates.phone = formData.phone;

            const update = await updatePlayer(ffeId, updates);

            if (!update?.success)
              return alert("Le joueur n'a pu être modifié.");

            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}