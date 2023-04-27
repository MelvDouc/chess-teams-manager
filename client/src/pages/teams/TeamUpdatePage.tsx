import TeamForm from "@src/components/forms/TeamForm.jsx";
import { getTeam, createTeam } from "@src/utils/api.js";

export default async function TeamUpdatePage({ name }: {
  name: string;
}) {
  const team = await getTeam(name);
  const teamForm = await TeamForm({
    team: {
      name: team!.name,
      captain_ffe_id: team!.captain.ffe_id
    },
    handleSubmit: async (team) => {
      const createResult = await createTeam(team);

      if (!createResult) {
        alert("L'équipe n'a pu être mise à jour.");
        return;
      }

      location.assign("/teams");
    }
  });

  return (
    <>
      <h2>Modifier une équipe</h2>
      {teamForm}
    </>
  );
}