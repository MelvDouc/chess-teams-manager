import Table from "@src/components/Table/Table.jsx";
import RouterLink from "@src/routing/RouterLink.jsx";
import { getMatches } from "@src/utils/api.js";
import { PublicEntities } from "@src/types.js";

export default async function MatchesPage({ season }: {
  season: number;
}) {
  const matches = (await getMatches(season) ?? []).reduce((acc, match) => {
    acc[match.team.name] ??= [];
    acc[match.team.name].push(match);
    return acc;
  }, {} as Record<string, PublicEntities.Match[]>);

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
        {Object.entries(matches).map(([teamName, matches]) => (
          <>
            <Table.SubtitleRow title={teamName} colSpan={5} />
            <tbody>
              {matches.map(({ round, opponent, home_club, date, time }) => (
                <tr>
                  <td>{round}</td>
                  <td>{opponent.name}</td>
                  <td>
                    <address>{home_club.address}</address>
                  </td>
                  <td>{date.slice(0, 10)} à {time.slice(0, 5)}</td>
                  <td>
                    <Table.Actions>
                      <RouterLink className="btn btn-primary" href={`/matchs/${season}/${round}/${teamName}/modifier`}>
                        <i className={"bi bi-pen-fill"}></i>
                      </RouterLink>
                      <RouterLink className="btn btn-warning" href={`/matchs/${season}/${round}/${teamName}/composition`}>Compo</RouterLink>
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