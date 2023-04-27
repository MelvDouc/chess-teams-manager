import MatchForm from "@src/components/forms/MatchForm.jsx";
import { getMatch, updateMatch } from "@src/utils/api.js";
import { ShortMatchInfo } from "@src/types.js";

export default async function MatchCreatePage(matchInfo: ShortMatchInfo) {
  const match = await getMatch(matchInfo);
  const form = await MatchForm({
    match: match!,
    handleSubmit: async (data) => {
      const updateResult = await updateMatch(match!.id, data);

      if (!updateResult?.success) {
        alert(updateResult?.errors ? updateResult.errors.join("\n") : "Le match n'a pas pu être mis à jour.");
        return;
      }

      location.assign("/matchs");
    }
  });

  return (
    <>
      <h2>Modifier un match</h2>
      {form}
    </>
  );
}