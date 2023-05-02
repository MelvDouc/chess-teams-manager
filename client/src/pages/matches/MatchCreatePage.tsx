import Modal from "@src/components/Modal/Modal.jsx";
import MatchForm from "@src/components/forms/MatchForm.jsx";
import router from "@src/router.jsx";
import { post } from "@src/utils/api.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function MatchCreatePage() {
  const players = await playersCache.get();

  return (
    <>
      <h2>Ajouter un match</h2>
      <MatchForm
        match={null}
        players={players ?? []}
        handleSubmit={async ({ _id, ...match }) => {
          const postResult = await post("/matches/create", match);

          if (!postResult?.acknowledged)
            return alert("Le match n'a pu être créé.");

          Modal.setState({
            type: "success",
            message: "Le match a bien été créé.",
            onClose: () => router.navigate(`/matchs/${match.season}`)
          });
        }}
      />
    </>
  );
}