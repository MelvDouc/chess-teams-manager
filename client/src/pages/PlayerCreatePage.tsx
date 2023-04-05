import PlayerForm from "@components/PlayerForm/PlayerForm.jsx";
import { players } from "@utils/api.js";
import { Player } from "@types";

export default async function PlayerCreatePage() {
  return (
    <PlayerForm
      player={{
        ffeId: "",
        fideId: null,
        email: "",
        lastName: "",
        firstName: ""
      }}
      handleSubmit={async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries([...new FormData(e.target as HTMLFormElement)]) as unknown as Player;
        const createResult = await players.create(formData);

        if (createResult?.errors) {
          return alert(createResult.errors.join("\n"));
        }

        location.assign("/joueurs");
      }}
    />
  );
}