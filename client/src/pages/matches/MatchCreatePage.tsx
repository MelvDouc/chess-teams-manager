import MatchForm from "@src/components/forms/MatchForm.jsx";
import { createMatch } from "@src/utils/api.js";

export default async function MatchCreatePage() {
  const form = await MatchForm({
    match: null,
    handleSubmit: async (data) => {
      const insertedId = await createMatch(data);

      if (!insertedId) {
        alert("Le match n'a pu être créé.");
        return;
      }

      location.assign("/matchs");
    }
  });

  return (
    <>
      <h2>Ajouter un match</h2>
      {form}
    </>
  );
}