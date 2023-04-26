import Form from "@src/components/Form/Form.jsx";
import { DbEntities } from "@src/types.js";

export default function MatchForm({ match, clubs, handleSubmit }: {
  match: DbEntities.Match | null;
  clubs: DbEntities.Club[];
  handleSubmit: (e: SubmitEvent) => any;
}) {
  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group
          type="number"
          labelText="Saison"
          nameAndId="season"
          required={true}
          value={match?.season}
        />
        <Form.Group
          type="number"
          labelText="Ronde"
          nameAndId="round"
          required={true}
          value={match?.round}
        />
      </Form.Row>
      <Form.Row>
        <Form.Select
          nameAndId="opponent"
          labelText="Adversaire"
          values={clubs.map((club) => ({
            text: club.name,
            value: club.id,
            selected: club.name === match?.opponent?.name
          }))}
          required={true}
        />
        <Form.Checkbox
          nameAndId="white_on_odds"
          labelText="Blancs aux premiers"
          checked={match?.white_on_odds}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Équipe"
          nameAndId="team_name"
          required={true}
          value={match?.team?.name}
        />
        <Form.Group
          type="text"
          labelText="Date"
          nameAndId="date"
          required={true}
          placeholder="AAAA/MM/JJ HH:mm"
          value={match?.date}
        />
      </Form.Row>
      <Form.Submit backLink="/matchs" text="Valider" />
    </Form>
  );
}