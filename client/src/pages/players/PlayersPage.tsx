import PlayersTable from "@src/components/PlayersTable/PlayersTable.jsx";
import $401Page from "@src/pages/401Page.jsx";
import auth from "@src/utils/auth.js";
import RoleIndex from "@src/utils/RoleIndex.js";
import { playersCache } from "@src/utils/local-storage.js";

export default async function PlayersPage() {
  const userData = auth.getUser();

  // if (!userData)
  //   return location.assign("/connexion");

  // @ts-ignore
  if (!(RoleIndex[userData?.role] >= RoleIndex.CAPTAIN))
    return $401Page();

  const players = await playersCache.get();

  return (
    <>
      <h2>Joueurs</h2>
      <PlayersTable players={players ?? []} clearCache={playersCache.clear} userData={userData!} />
    </>
  );
}