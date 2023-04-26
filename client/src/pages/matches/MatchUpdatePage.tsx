import MatchForm from "@src/components/MatchForm/MatchForm.jsx";
import { getMatch, getClubs } from "@src/utils/api.js";
import { ShortMatchInfo } from "@src/types.js";

export default async function MatchCreatePage(matchInfo: ShortMatchInfo) {
  const match = await getMatch(matchInfo);
  const clubs = await getClubs();

  return (
    <>
      <h2>Modifier un match</h2>
      <MatchForm
        match={match}
        clubs={clubs ?? []}
        handleSubmit={() => { }}
      ></MatchForm>
    </>
  );
}