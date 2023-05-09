import { Observable } from "reactfree-jsx";
import { Player } from "@src/types.js";

export default function CreateTextFilter(filterObs: Observable<Map<symbol, PlayerFilter>>) {
  return ({ filter }: {
    filter: (player: Player, value: string) => boolean;
  }) => {
    const key = Symbol();

    return (
      <input
        type="search"
        $init={(element) => {
          element.addEventListener("input", () => {
            const value = element.value.trim().toLowerCase();
            (value)
              ? filterObs.value.set(key, (player) => filter(player, value))
              : filterObs.value.delete(key);
            filterObs.notify();
          });
          filterObs.subscribe((map) => {
            if (!map.size)
              element.value = "";
          });
        }}
      />
    );
  };
}

type PlayerFilter = (player: Player) => boolean;