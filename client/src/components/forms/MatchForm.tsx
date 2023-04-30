import { Observable } from "reactfree-jsx";
import Form from "@src/components/Form/Form.jsx";
import LineUpTable from "@src/components/LineUpTable/LineUpTable.jsx";
import createAccessors from "@src/utils/create-accessors.js";
import { Match, Player } from "@src/types.js";

export default function MatchForm({ match, players, handleSubmit }: {
  match: Match | null;
  players: Player[];
  handleSubmit: (match: Match) => any;
}) {
  const season = match?.season ?? 2023;
  const m: Match = match ?? {
    _id: "",
    address: "",
    city: "",
    zipCode: "",
    date: "",
    lineUp: Array(8).fill(null).reduce((acc, value, i) => {
      acc[i + 1] = value;
      return acc;
    }, {} as Match["lineUp"]),
    opponent: "",
    teamName: "Thionville I",
    round: 1,
    season,
    whiteOnOdds: true,
    captainFfeId: "",
  };
  const whiteOnOddsObs = new Observable(m.whiteOnOdds);

  whiteOnOddsObs.subscribe((value) => m.whiteOnOdds = value);

  return (
    <>
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
            placeholder="Thionville I"
            value={m.teamName}
            updateValue={(teamName) => m.teamName = teamName.trim()}
            required
          />
          <Form.Checkbox
            nameAndId="whiteOnOdds"
            labelText="Blancs aux échiquiers impairs"
            checked={m.whiteOnOdds}
            updateValue={(whiteOnOdds) => whiteOnOddsObs.value = whiteOnOdds}
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
          <div className="d-flex flex-column gap-2">
            <Form.Group
              type="text"
              nameAndId="city"
              labelText="Ville"
              value={m.city}
              updateValue={(city) => m.city = city.trim()}
              required
            />
            <Form.Group
              type="text"
              nameAndId="zipCode"
              labelText="Code postal"
              value={m.zipCode}
              updateValue={(zipCode) => m.zipCode = zipCode.trim()}
              required
            />
          </div>
        </Form.Row>
        <Form.Row>
          <div>
            <label className="form-label">Composition</label>
            <div className="overflow-x-auto">
              <LineUpTable
                lineUpAccessors={createAccessors(m, "lineUp")}
                captainFfeIdAccessors={createAccessors(m, "captainFfeId")}
                whiteOnOddsObs={whiteOnOddsObs}
                players={players}
              />
            </div>
          </div>
        </Form.Row>
        <Form.Row>
          <Form.Submit backLink={`/matchs/${season}`} text="Valider" />
        </Form.Row>
      </Form>
    </>
  );
}

