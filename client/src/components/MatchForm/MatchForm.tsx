import { Match } from "@types";
import Form from "@components/Form/Form.jsx";

export default function MatchForm({ match, handleSubmit }: {
  match: Match | null;
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
          labelText="Équipe"
          nameAndId="teamName"
          required={true}
          value={match?.teamName}
        />
        <Form.Group
          type="checkbox"
          labelText="Blancs au premier"
          nameAndId="whiteOnOdds"
          required={true}
          value={match?.whiteOnOdds}
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
        <Form.Group
          type="text"
          labelText="Date"
          nameAndId="date"
          required={true}
          placeholder="YYYY/MM/JJ HH:mm"
          value={match?.date}
        />
      </Form.Row>
      <Form.Submit backLink="/matchs" text="Créer" />
    </Form>
  );
}