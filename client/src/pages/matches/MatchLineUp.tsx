import { getMatchLineUp } from "@src/utils/api.js";
import Table from "@src/components/Table/Table.jsx";
import { ShortMatchInfo } from "@src/types.js";

export default async function MatchLineUp(matchDetail: ShortMatchInfo) {
  const lineUp = await getMatchLineUp(matchDetail);

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
              <td>{player ? `${player.last_name} ${player.first_name}` : ""}</td>
              <td>{player?.ffe_id ?? ""}</td>
              <td>{player?.rating ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}