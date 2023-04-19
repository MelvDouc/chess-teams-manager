import Table from "@components/Table/Table.jsx";
import RouterLink from "@routing/RouterLink.jsx";
import { matches } from "@utils/api.js";
import cssClasses from "@styles/btn.module.scss";

export default async function MatchesPage({ season }: {
  season: number;
}) {
  const matchesBySeason = await matches.bySeason(season);

  return (
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
      {(matchesBySeason ?? []).map(({ teamName, matches }) => (
        <>
          <Table.SubtitleRow title={teamName} colSpan={5} />
          <tbody>
            {matches.map(({ _id, round, opponent, address, date }) => (
              <tr>
                <td>{round}</td>
                <td>{opponent}</td>
                <td>
                  <address>{address}</address>
                </td>
                <td>{date}</td>
                <td>
                  <Table.Actions>
                    <RouterLink className={`${cssClasses.btn} ${cssClasses.btnBlue}`} href={`/matchs/${_id}/modifier`}>
                      <i className={"bi bi-pen-fill"}></i>
                    </RouterLink>
                    <RouterLink className={`${cssClasses.btn} ${cssClasses.btnBlue}`} href={`/matchs/composition/${_id}`}>Compo</RouterLink>
                  </Table.Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      ))}
    </Table>
  );
}