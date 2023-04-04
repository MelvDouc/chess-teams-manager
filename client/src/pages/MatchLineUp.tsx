import { matches } from "@utils/api.js";

export default async function MatchLineUp(lineUpDetail: Parameters<typeof matches["lineUp"]>[0]) {
  const lineUp = await matches.lineUp(lineUpDetail);

  if (!lineUp)
    return (
      <p></p>
    );

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
        {lineUp!.map(({ board, color, player }) => {
          return (
            <tr>
              <td>{board + color}</td>
              <td>{player ? (player.lastName + " " + player.firstName) : ""}</td>
              <td>{player?.ffeId ?? ""}</td>
              <td>{player?.rating ?? ""}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/*
{(lineUp!.players).map(({ player }) => {
          const color = (lineUp!.whiteOnOdds);
        })}
        */