import MatchForm from "@components/MatchForm/MatchForm.jsx";
import { getClubs } from "@utils/api.js";

export default async function MatchCreatePage() {
  const clubs = await getClubs();

  return (
    <>
      <h2>Ajouter un match</h2>
      <MatchForm
        match={null}
        clubs={clubs ?? []}
        handleSubmit={() => { }}
      ></MatchForm>
    </>
  );
}