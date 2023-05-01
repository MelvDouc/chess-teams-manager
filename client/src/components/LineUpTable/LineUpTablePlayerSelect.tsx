import { FreeJSX } from "reactfree-jsx";
import { Match, Player } from "@src/types.js";

const playersByFullName = new Map<string, Player>();

export default function LineUpTablePlayerSelect({ board, lineUpObs, players }: {
  board: number;
  players: Player[];
  lineUpObs: FreeJSX.Obs<Match["lineUp"]>;
}) {
  const getPlayerByName = createGetPlayerByNameFn(players);
  const initialPlayer = players.find(({ ffeId }) => ffeId === lineUpObs.value[board]?.ffeId);

  return (
    <>
      <input
        type="text"
        oninput={({ target }) => {
          const player = getPlayerByName((target as HTMLInputElement).value.toLowerCase());
          lineUpObs.value[board] = (player)
            ? {
              ffeId: player.ffeId,
              rating: player.rating,
              name: getPlayerFullName(player)
            }
            : null;
          lineUpObs.notify();
        }}
        value={initialPlayer ? getPlayerFullName(initialPlayer) : ""}
        $init={(element) => element.setAttribute("list", "players-datalist")}
      />
    </>
  );
}

function getPlayerFullName({ firstName, lastName }: Player) {
  return `${firstName} ${lastName}`;
}

function createGetPlayerByNameFn(players: Player[]) {
  return (fullLowerCaseName: string) => {
    if (playersByFullName.has(fullLowerCaseName))
      return playersByFullName.get(fullLowerCaseName);

    const player = players.find((player) => getPlayerFullName(player).toLowerCase() === fullLowerCaseName);

    if (player)
      playersByFullName.set(fullLowerCaseName, player);

    return player;
  };
}