import TeamForm from "@src/components/forms/TeamForm.jsx";
import { get, post } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function TeamUpdatePage({ name }: {
  name: string;
}) {
  const team = await get<PublicEntities.Team>(`/teams/${name}`);

  if (!team)
    return (
      <p>Équipe non trouvée.</p>
    );

  const teamForm = await TeamForm({
    team: {
      name: team.name,
      captain_ffe_id: team.captain.ffe_id
    },
    handleSubmit: async (team) => {
      const insertedId = await post("/teams/create", team);

      if (!insertedId)
        return alert("L'équipe n'a pu être mise à jour.");

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