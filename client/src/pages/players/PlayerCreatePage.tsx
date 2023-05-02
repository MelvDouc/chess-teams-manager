import Modal from "@src/components/Modal/Modal.jsx";
import PlayerForm from "@src/components/forms/PlayerForm.jsx";
import router from "@src/router.jsx";
import { post } from "@src/utils/api.js";

export default function PlayerCreatePage() {
  return (
    <>
      <h2>Ajouter un joueur</h2>
      <PlayerForm
        player={null}
        handleSubmit={async (player) => {
          const insertedId = await post("/players/create", player);

          if (!insertedId)
            return alert("Le joueur n'a pas pu être créé.");

          Modal.setState({
            type: "success",
            message: "Le joueur a bien été créé.",
            onClose: () => router.navigate("/joueurs")
          });
        }}
      />
    </>
  );
}