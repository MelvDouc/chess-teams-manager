import Modal from "@src/components/Modal/Modal.jsx";
import PlayerForm from "@src/components/forms/PlayerForm.jsx";
import $404Page from "@src/pages/404Page.jsx";
import router from "@src/router.jsx";
import { get, update } from "@src/utils/api.js";
import { Player } from "@src/types.js";

export default async function PlayerUpdatePage({ ffeId }: { ffeId: string; }) {
  const player = await get<Player>(`/players/${ffeId}`);

  if (!player) return $404Page;

  return (
    <>
      <h2>Modifier un joueur</h2>
      <PlayerForm
        player={player}
        handleSubmit={async (updates) => {
          const updateResult = await update(`/players/${player.ffeId}/update`, updates);

          if (!updateResult?.acknowledged)
            return alert("Le joueur n'a pas pu être modifié.");

          Modal.setState({
            type: "success",
            message: "Le joueur a bien été modifié.",
            onClose: () => router.navigate("/joueurs"),
          });
        }}
      />
    </>
  );
}
