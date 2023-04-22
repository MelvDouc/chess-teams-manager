import PlayerForm from "@components/PlayerForm/PlayerForm.jsx";
import { createPlayer } from "@utils/api.js";
import { DbEntities } from "@types";

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

            if (!(await createPlayer(formData))?.affectedRows)
              return alert("Une erreur s'est produite.");

            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}