import PlayerForm from "@components/PlayerForm/PlayerForm.jsx";
import { players } from "@utils/api.js";

export default async function PlayerUpdatePage({ ffeId }: { ffeId: string; }) {
  const player = await players.one(ffeId);

  return (
    <>
      <h2>Modifier {ffeId}</h2>
      <div className="container-sm">
        <PlayerForm
          player={player!}
          handleSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const updates = {
              ffeId: formData.get("ffeId"),
              fideId: Number(formData.get("fideId")),
              email: formData.get("email"),
              firstName: formData.get("firstName"),
              lastName: formData.get("lastName"),
              phone: formData.get("phone"),
              rating: Number(formData.get("rating"))
            };
            const update = await players.update(player!.ffeId, updates);
            if (update?.errors) {
              return alert(update.errors.join("\n"));
            }
            location.assign("/joueurs");
          }}
        />
      </div>
    </>
  );
}