import Table from "@src/components/Table/Table.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import { get, createLink } from "@src/utils/api.js";
import { formatDate } from "@src/utils/date-formatter.js";
import { MatchesByTeamName } from "@src/types.js";

export default async function MatchesPage({ season }: {
  season: number;
}) {
  const matchesByTeamName = await get<MatchesByTeamName[]>(`/matches/${season}`);

  return (
    <>
      <h2>Matchs {season - 1}-{season}</h2>
      <Table large={true}>
        <thead>
          <tr>
            <th>Rd.</th>
            <th>Adversaire</th>
            <th>Adresse</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {(matchesByTeamName ?? []).map(({ teamName, matches }) => (
          <>
            <Table.SubtitleRow title={teamName} colSpan={5} />
            <tbody>
              {matches.map(({ round, opponent, address, date }) => (
                <tr>
                  <td>{round}</td>
                  <td>{opponent}</td>
                  <td>
                    <address>{address}</address>
                  </td>
                  <td>{formatDate(new Date(date))}</td>
                  <td>
                    <Table.Actions>
                      <RouterLink className="btn btn-primary" href={`/matchs/${season}/${round}/${teamName}/modifier`}>
                        <i className={"bi bi-pen-fill"}></i>
                      </RouterLink>
                      <button
                        className="btn btn-warning"
                        onclick={() => {
                          window.open(createLink(`/matches/${season}/${round}/${teamName}/score-sheet`));
                        }}
                      >Feuille de match</button>
                    </Table.Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ))}
      </Table>
    </>
  );
}