import Form from "@src/components/Form/Form.jsx";
import { get } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function TeamForm({ team, handleSubmit }: {
  team: Team | null;
  handleSubmit: (team: Team) => void;
}) {
  const players = await get<PublicEntities.Player[]>("/players");
  const t = team ?? {
    name: "",
    captain_ffe_id: players?.at(0)?.ffe_id ?? ""
  };

  return (
    <Form handleSubmit={(e) => {
      e.preventDefault();
      handleSubmit(t);
    }}>
      <Form.Row>
        <Form.Group
          nameAndId="name"
          type="text"
          labelText="Nom"
          value={team?.name}
          updateValue={(name) => t.name = name}
          required
        />
        <Form.Select
          labelText="Capitaine"
          nameAndId="captain_ffe_id"
          values={(players ?? []).map(({ ffe_id, first_name, last_name }) => {
            return {
              value: ffe_id,
              text: `${first_name} ${last_name}`,
              selected: ffe_id === team?.captain_ffe_id
            };
          })}
          updateValue={(captain_ffe_id) => t.captain_ffe_id = captain_ffe_id}
        />
      </Form.Row>
      <Form.Submit text="Valider" backLink="/equipes" />
    </Form>
  );
}

type Team = {
  name: string;
  captain_ffe_id: string;
};