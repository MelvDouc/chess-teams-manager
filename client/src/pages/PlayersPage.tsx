import { players } from "@utils/api.js";

export default async function PlayersPage() {
  const allPlayers = await players.all();
  return (
    <ul>
      {(allPlayers ?? []).map((p) => (
        <li>{p.ffeId}</li>
      ))}
    </ul>
  );
}