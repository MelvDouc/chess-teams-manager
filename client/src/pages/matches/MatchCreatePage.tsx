import MatchForm from "@src/components/forms/MatchForm.jsx";
import { post } from "@src/utils/api.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function MatchCreatePage() {
  const players = await playersCache.get();

  return (
    <>
      <h2>Ajouter un match</h2>
      <MatchForm
        match={null}
        players={players ?? []}
        handleSubmit={async ({ _id, ...match }) => {
          const insertedId = await post("/matches/create", match);

          if (!insertedId)
            return alert("Le match n'a pu être créé.");

          location.assign(`/matchs/${match.season}`);
        }}
      />
    </>
  );
}