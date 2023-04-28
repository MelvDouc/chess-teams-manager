import Form from "@src/components/Form/Form.jsx";
import { Match } from "@src/types.js";

export default function MatchForm({ match, handleSubmit }: {
  match: Match | null;
  handleSubmit: (match: Match) => any;
}) {
  const m: Match = match ?? {
    _id: "",
    address: "",
    date: "",
    lineUp: [],
    opponent: "",
    teamName: "Thionville I",
    round: 1,
    season: 2023,
    whiteOnOdds: true
  };

  return (
    <Form handleSubmit={(e) => {
      e.preventDefault();
      handleSubmit(m);
    }}>
      <Form.Row>
        <Form.Group
          type="number"
          labelText="Saison"
          nameAndId="season"
          value={m.season}
          updateValue={(season) => m.season = Number(season)}
          required
        />
        <Form.Group
          type="number"
          labelText="Ronde"
          nameAndId="round"
          min={1}
          value={m.round}
          updateValue={(round) => m.round = Number(round)}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          nameAndId="opponent"
          labelText="Adversaire"
          value={m.opponent}
          updateValue={(opponent) => m.opponent = opponent}
          required
        />
        <Form.Group
          type="datetime-local"
          labelText="Date"
          nameAndId="date"
          value={m.date.slice(0, 16)}
          updateValue={(date: Date | null) => {
            if (date)
              m.date = date.toISOString();
          }}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          nameAndId="teamName"
          labelText="Équipe"
          value={m.teamName}
          updateValue={(teamName) => m.teamName = teamName.trim()}
          required
        />
        <Form.Checkbox
          nameAndId="whiteOnOdds"
          labelText="Blancs aux premiers"
          checked={m.whiteOnOdds}
          updateValue={(whiteOnOdds) => m.whiteOnOdds = whiteOnOdds}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="textarea"
          nameAndId="address"
          labelText="Adresse"
          value={m.address}
          updateValue={(address) => m.address = address.trim()}
          required
        />
      </Form.Row>
      <Form.Submit backLink="/matchs" text="Valider" />
    </Form>
  );
}

