import { players } from "@utils/api.js";

export default async function PlayersPage() {
  const allPlayers = await players.all();
  return (
    <div>{JSON.stringify(allPlayers)}</div>
  );
}