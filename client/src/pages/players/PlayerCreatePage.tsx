import AlertBox from "@src/components/AlertBox/AlertBox.jsx";
import PlayerForm from "@src/components/forms/PlayerForm.jsx";
import router from "@src/router.jsx";
import { post } from "@src/utils/api.js";

export default function PlayerCreatePage() {
  const form = PlayerForm({
    player: null,
    handleSubmit: async (player) => {
      const insertedId = await post("/players/create", player);

      if (!insertedId)
        return alert("Le joueur n'a pas pu être créé.");

      AlertBox({
        type: "success",
        message: "Le joueur a bien été créé.",
        postClose: () => router.navigate("/joueurs")
      });
    }
  });

  return (
    <>
      <h2>Ajouter un joueur</h2>
      {form}
    </>
  );
}