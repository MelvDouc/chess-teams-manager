import PlayerForm from "@src/components/forms/PlayerForm.jsx";
import { get, update } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function PlayerUpdatePage({ ffeId }: { ffeId: string; }) {
  const player = await get<PublicEntities.Player>(`/players/${ffeId}`);

  if (!player)
    return (
      <p>Joueur non trouvé.</p>
    );

  return (
    <>
      <h2>Modifier {ffeId}</h2>
      <div className="container-sm">
        <PlayerForm
          player={player}
          handleSubmit={async (p) => {
            const updateResult = await update(`/players/${ffeId}/update`, p);

            if (!updateResult?.success)
              return alert("Le joueur n'a pu être modifié.");

            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}