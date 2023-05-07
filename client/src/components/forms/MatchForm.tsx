import { Observable } from "reactfree-jsx";
import Form from "@src/components/Form/Form.jsx";
import LineUpTable from "@src/components/LineUpTable/LineUpTable.jsx";
import createAccessors from "@src/utils/create-accessors.js";
import { getDatePortion } from "@src/utils/date-formatter.js";
import { matchesByTeamNameCache } from "@src/utils/local-storage.js";
import { Match, Player } from "@src/types.js";
import MatchFormAddress from "./MatchFormAddress.jsx";

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
    date: new Date(),
    lineUp: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
    },
    opponent: "",
    teamName: "Thionville I",
    round: 1,
    season,
    whiteOnOdds: true,
    captainFfeId: null,
  };
  const fullAddress = {
    address: m.address,
    city: m.city,
    zipCode: m.zipCode,
  };
  const whiteOnOddsObs = new Observable(m.whiteOnOdds);

  whiteOnOddsObs.subscribe((value) => (m.whiteOnOdds = value));

  return (
    <Form
      onsubmit={(e) => {
        e.preventDefault();
        matchesByTeamNameCache.clear();
        handleSubmit(Object.assign(m, fullAddress));
      }}
    >
      <div className="container d-flex flex-column gap-3 p-3">
        <section className="row">
          <article className="col-12 col-sm-4">
            <Form.Group
              type="number"
              labelText="Saison"
              nameAndId="season"
              value={m.season}
              handleInput={(season) => m.season = Number(season)}
              required
            />
          </article>
          <article className="col-12 col-sm-3">
            <Form.Group
              type="number"
              labelText="Ronde"
              nameAndId="round"
              min={1}
              value={m.round}
              handleInput={(round) => m.round = Number(round)}
              required
            />
          </article>
          <article className="col-12 col-sm-5">
            <Form.Group
              type="date"
              labelText="Date"
              nameAndId="date"
              value={getDatePortion(new Date(m.date))}
              handleInput={(date: Date | null) => date && (m.date = date)}
              required
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="opponent"
              labelText="Adversaire"
              value={m.opponent}
              handleInput={(opponent) => m.opponent = opponent}
              required
            />
          </article>
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="team-name"
              labelText="Équipe"
              placeholder="Thionville I"
              value={m.teamName}
              handleInput={(teamName) => m.teamName = teamName.trim()}
              required
            />
          </article>
        </section>
        <section className="row">
          <MatchFormAddress fullAddress={fullAddress} />
        </section>
        <section className="row">
          <article className="col-12">
            <Form.Checkbox
              id="white-on-odds"
              labelText="Blancs aux échiquiers impairs"
              checked={m.whiteOnOdds}
              handleInput={(whiteOnOdds) => whiteOnOddsObs.value = whiteOnOdds}
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12">
            <label className="form-label">Composition</label>
            <div className="overflow-x-auto">
              <LineUpTable
                lineUpAccessors={createAccessors(m, "lineUp")}
                captainFfeIdAccessors={createAccessors(m, "captainFfeId")}
                whiteOnOddsObs={whiteOnOddsObs}
                players={players}
              />
            </div>
          </article>
        </section>
        <Form.Submit backLink={`/matchs/${season}`} text="Valider" />
      </div>
    </Form>
  );
}
