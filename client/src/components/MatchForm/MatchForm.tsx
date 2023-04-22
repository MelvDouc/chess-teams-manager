import Form from "@components/Form/Form.jsx";
import { DbEntities } from "@types";

export default function MatchForm({ match, handleSubmit }: {
  match: DbEntities.Match | null;
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
        <Form.Group
          type="text"
          labelText="Adversaire"
          nameAndId="opponent"
          required={true}
          value={match?.opponent}
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