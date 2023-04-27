import PlayerForm from "@src/components/forms/PlayerForm.jsx";
import { createPlayer } from "@src/utils/api.js";
import { DbEntities } from "@src/types.js";

export default async function PlayerCreatePage() {
  return (
    <>
      <h2>Ajouter un joueur</h2>
      <div className="container-sm">
        <PlayerForm
          player={{
            ffe_id: "",
            fide_id: null,
            email: "",
            last_name: "",
            first_name: "",
            phone: null,
            rating: 1199
          }}
          handleSubmit={async (e) => {
            e.preventDefault();
            const formData = Object.fromEntries([...new FormData(e.target as HTMLFormElement)]) as unknown as DbEntities.Player;
            const insertedId = await createPlayer(formData);

            if (insertedId === null || insertedId === 0)
              return alert("Une erreur s'est produite.");

            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}