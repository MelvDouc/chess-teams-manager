import Table from "@src/components/Table/Table.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import { SERVER_URL } from "@src/utils/api.js";
import { formatDate } from "@src/utils/date-formatter.js";
import { matchesByTeamNameCache } from "@src/utils/local-storage.js";

export default async function MatchesPage({ season }: {
  season: number;
}) {
  const matchesByTeamName = await matchesByTeamNameCache.get(season);

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
              {matches.map(({ round, opponent, address, city, zipCode, date }) => (
                <tr>
                  <td>{round}</td>
                  <td>{opponent}</td>
                  <td>
                    <address className="m-0">
                      <p className="m-0">{address}</p>
                      <p className="m-0">{zipCode} {city}</p>
                    </address>
                  </td>
                  <td>{formatDate(new Date(date))}</td>
                  <td>
                    <Table.Actions>
                      <RouterLink
                        href={`/matchs/${season}/${round}/${teamName}/modifier`}
                        className="btn btn-primary"
                        title="Modifier"
                      >
                        <i className={"bi bi-pen-fill"}></i>
                      </RouterLink>
                      <a
                        href={`${SERVER_URL}/matchs/${season}/${round}/${teamName}/feuille-de-match`}
                        target="_blank"
                        className="btn btn-warning"
                        title="Feuille de match"
                      >
                        <i className="bi bi-table"></i>
                      </a>
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