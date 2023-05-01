import MatchForm from "@src/components/forms/MatchForm.jsx";
import { get, update } from "@src/utils/api.js";
import { Match, ShortMatchInfo } from "@src/types.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function MatchCreatePage({ season, round, teamName }: Record<keyof ShortMatchInfo, string>) {
  const match = await get<Match>(`/matches/${season}/${round}/${teamName}`);
  const players = await playersCache.get();

  return (
    <>
      <h2>Modifier un match</h2>
      <MatchForm
        match={match}
        players={players ?? []}
        handleSubmit={async ({ _id, ...updates }) => {
          const updateResult = await update(`/matches/${_id}/update`, updates);

          if (!updateResult?.success) {
            alert(updateResult?.errors ? updateResult.errors.join("\n") : "Le match n'a pas pu être mis à jour.");
            return;
          }

          location.assign(`/matchs/${updates.season ?? 2023}`);
        }}
      />
    </>
  );
}