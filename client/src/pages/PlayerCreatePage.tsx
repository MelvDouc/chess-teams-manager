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
        const createResult = await players.create({
          ffeId: (formData.ffeId ?? "").trim(),
          fideId: formData.fideId ?? null,
          email: (formData.email ?? "").trim(),
          firstName: (formData.firstName ?? "").trim(),
          lastName: (formData.lastName ?? "").trim().toUpperCase(),
          phone: formData.phone,
          rating: formData.rating
        });

        if (createResult?.errors) {
          return alert(createResult.errors.join("\n"));
        }

        location.assign("/joueurs");
      }}
    />
  );
}