import PlayersTable from "@src/components/PlayersTable/PlayersTable.jsx";
import auth from "@src/utils/auth.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const players = await playersCache.get();
  const userData = auth.getUser();

  if (!userData)
    throw new Error("503");

  return (
    <>
      <h2>Joueurs</h2>
      <PlayersTable players={players ?? []} clearCache={playersCache.clear} userData={userData} />
    </>
  );
}