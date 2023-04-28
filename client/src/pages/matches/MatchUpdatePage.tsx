import MatchForm from "@src/components/forms/MatchForm.jsx";
import { get, update } from "@src/utils/api.js";
import { Match, ShortMatchInfo } from "@src/types.js";

export default async function MatchCreatePage({ season, round, teamName }: ShortMatchInfo) {
  const match = await get<Match>(`/matches/${season}/${round}/${teamName}`);

  return (
    <>
      <h2>Modifier un match</h2>
      <MatchForm
        match={match}
        handleSubmit={async ({ _id, ...updates }) => {
          const updateResult = await update(`/matches/${_id}/update`, updates);

          if (!updateResult?.success) {
            alert(updateResult?.errors ? updateResult.errors.join("\n") : "Le match n'a pas pu être mis à jour.");
            return;
          }

          location.assign("/matchs");
        }}
      />
    </>
  );
}