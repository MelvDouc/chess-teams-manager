import { matches } from "@utils/api.js";
import Table from "@components/Table/Table.jsx";

export default async function MatchLineUp({ matchId }: { matchId: string; }) {
  const lineUp = await matches.getLineUp(matchId);

  if (!lineUp)
    return (
      <p>Composition indisponible.</p>
    );

  return (
    <>
      <h2>Composition</h2>
      <Table large={false}>
        <thead>
          <tr>
            <th>Éch.</th>
            <th>NOM Prénom</th>
            <th>N° FFE</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {lineUp.map(({ board, color, player }) => (
            <tr>
              <td>{board + color}</td>
              <td>{player ? `${player.lastName} ${player.firstName}` : ""}</td>
              <td>{player?.ffeId ?? ""}</td>
              <td>{player?.rating ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}