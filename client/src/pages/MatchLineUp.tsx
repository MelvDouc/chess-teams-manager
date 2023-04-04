import { matches } from "@utils/api.js";

export default async function MatchLineUp(lineUpDetail: Parameters<typeof matches["lineUp"]>[0]) {
  const lineUp = await matches.lineUp(lineUpDetail);
  console.log({ lineUp });

  return (
    <table>
      <thead>
        <tr>
          <th>Éch.</th>
          <th>NOM Prénom</th>
          <th>N° FFE</th>
          <th>Elo</th>
        </tr>
      </thead>
      <tbody>
        {(lineUp!).map(({ board, color, player }) => (
          <tr>
            <td>{board + color}</td>
            <td>{player ? `${player.lastName.toUpperCase() + " " + player.firstName}` : ""}</td>
            <td>{player?.ffeId}</td>
            <td>{player ? (player.rating ?? 1199) : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}