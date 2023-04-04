import RouterLink from "@routing/RouterLink.jsx";
import { matches } from "@utils/api.js";

export default async function MatchesPage({ season }: {
  season: number;
}) {
  const matchesByTeamName = (await matches.byTeamName(season)) ?? [];

  return <>
    {matchesByTeamName.map(({ teamName, matches }) => (
      <div>
        <h2>{teamName}</h2>
        <table>
          <thead>
            <tr>
              <th>Rd.</th>
              <th>Adversaire</th>
              <th>Adresse</th>
              <th>Date</th>
              <th>Composition</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(({ round, opponent, address, date, season }) => (
              <tr>
                <td>{round}</td>
                <td>{opponent}</td>
                <td>
                  <address>{address}</address>
                </td>
                <td>{date}</td>
                <td>
                  <RouterLink href={`/matchs/${season}/${teamName}/composition?ronde=${round}`}>Voir</RouterLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </>;
}