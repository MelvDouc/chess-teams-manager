import MatchForm from "@components/MatchForm/MatchForm.jsx";

export default function MatchCreatePage() {
  return (
    <>
      <h2>Ajouter un match</h2>
      <MatchForm
        match={null}
        handleSubmit={() => { }}
      ></MatchForm>
    </>
  );
}