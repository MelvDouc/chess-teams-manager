import MatchForm from "@src/components/forms/MatchForm.jsx";
import { post } from "@src/utils/api.js";

export default async function MatchCreatePage() {
  const form = await MatchForm({
    match: null,
    handleSubmit: async (match) => {
      const insertedId = await post("/matches/create", match);

      if (!insertedId)
        return alert("Le match n'a pu être créé.");

      location.assign("/matchs");
    }
  });

  return (
    <>
      <h2>Ajouter un match</h2>
      <p className="mb2">Pensez à d'abord ajouter le club adverse.</p>
      {form}
    </>
  );
}