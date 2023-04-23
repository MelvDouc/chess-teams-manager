import MatchForm from "@components/MatchForm/MatchForm.jsx";
import { getMatch, getClubs } from "@utils/api.js";
import { ShortMatchInfo } from "@types";

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