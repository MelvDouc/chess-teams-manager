import MatchForm from "@src/components/forms/MatchForm.jsx";
import { post } from "@src/utils/api.js";

export default function MatchCreatePage() {
  return (
    <>
      <h2>Ajouter un match</h2>
      <MatchForm
        match={null}
        handleSubmit={async ({ _id, ...match }) => {
          const insertedId = await post("/matches/create", match);

          if (!insertedId)
            return alert("Le match n'a pu être créé.");

          location.assign("/matchs");
        }}
      />
    </>
  );
}