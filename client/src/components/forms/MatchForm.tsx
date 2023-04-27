import Form from "@src/components/Form/Form.jsx";
import { get } from "@src/utils/api.js";
import { PublicEntities, MySqlEntities, WithoutId } from "@src/types.js";

export default async function MatchForm({ match, handleSubmit }: {
  match: PublicEntities.Match | null;
  handleSubmit: (match: WithoutId<MySqlEntities.Match>) => any;
}) {
  const teams = (await get<PublicEntities.Team[]>("/teams") ?? []);
  const clubs = (await get<PublicEntities.Club[]>("/clubs") ?? []);
  const [firstClub] = clubs!;
  const m = match ?? {
    date: "",
    time: "14:15",
    opponent: { id: firstClub?.id ?? 0, name: firstClub?.address },
    home_club: { id: firstClub?.id ?? 0, address: firstClub?.address },
    season: 0,
    round: 1,
    white_on_odds: true,
    team: { id: teams[0]?.id ?? 0, name: teams[0]?.name ?? "" }
  };

  return (
    <Form handleSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        date: m.date,
        time: m.time,
        home_club_id: m.home_club.id,
        opponent_id: m.opponent.id,
        team_id: m.team.id,
        round: m.round,
        season: m.season,
        white_on_odds: Number(m.white_on_odds) as 0 | 1
      });
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
        <Form.Select
          nameAndId="opponent"
          labelText="Adversaire"
          values={clubs.map((club) => ({
            text: club.name,
            value: club.id,
            selected: club.name === m.opponent.name
          }))}
          updateValue={(id) => m.opponent.id = Number(id)}
          required
        />
        <Form.Select
          nameAndId="home_club"
          labelText="Club qui reçoit"
          values={clubs.map((club) => ({
            text: club.name,
            value: club.id,
            selected: club.address === m.home_club.address
          }))}
          updateValue={(id) => m.home_club.id = Number(id)}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Select
          nameAndId="team"
          labelText="Équipe"
          values={teams.map((team) => ({
            text: team.name,
            value: team.id,
            selected: m.team.id === team.id
          }))}
          updateValue={(id) => m.team.id = Number(id)}
          required
        />
        <Form.Checkbox
          nameAndId="white_on_odds"
          labelText="Blancs aux premiers"
          checked={m.white_on_odds}
          updateValue={(white_on_odds) => m.white_on_odds = white_on_odds}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="date"
          labelText="Date"
          nameAndId="date"
          placeholder="AAAA-MM-JJ"
          value={m.date.slice(0, 10)}
          updateValue={(date) => m.date = date}
          required
        />
        <Form.Group
          type="time"
          labelText="Heure"
          nameAndId="time"
          value={m.time}
          updateValue={(time) => m.time = time}
          required
        />
      </Form.Row>
      <Form.Submit backLink="/matchs" text="Valider" />
    </Form>
  );
}

