import TeamForm from "@src/components/forms/TeamForm.jsx";
import { createTeam } from "@src/utils/api.js";

export default async function TeamCreatePage() {
  const teamForm = await TeamForm({
    team: null,
    handleSubmit: async (team) => {
      const createResult = await createTeam(team);

      if (!createResult) {
        alert("L'équipe n'a pu être créée.");
        return;
      }

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