import TeamForm from "@src/components/forms/TeamForm.jsx";
import { post } from "@src/utils/api.js";

export default async function TeamCreatePage() {
  const teamForm = await TeamForm({
    team: null,
    handleSubmit: async (team) => {
      const insertId = await post("/teams/create", team);

      if (!insertId)
        return alert("L'équipe n'a pu être créée.");

      location.assign("/equipes");
    }
  });

  return (
    <>
      <h2>Ajouter une équipe</h2>
      {teamForm}
    </>
  );
}