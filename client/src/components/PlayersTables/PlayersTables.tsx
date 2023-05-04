import { Observable } from "reactfree-jsx";
import PlayersTable from "./PlayersTable.js";
import { Player } from "@src/types.js";
import cssClasses from "./PlayersTable.module.scss";

export default function PlayersTables({ players, clearCache }: { players: Player[]; clearCache: VoidFunction }) {
  const playerSlices = players.reduce((acc, player, i) => {
    if (i % 25 === 0) acc.push([]);
    acc.at(-1)!.push(player);
    return acc;
  }, [] as Player[][]);
  const pageObs = new Observable(0);

  return (
    <>
      <section className="d-flex gap-2 mb-2">
        {Array.from({ length: playerSlices.length }, (_, i) => {
          const j = i * 25;
          return (
            <a
              href="#"
              classes={{
                "fw-bold": pageObs.map((value) => value === i),
              }}
              onclick={(e) => {
                e.preventDefault();
                pageObs.value = i;
              }}
            >
              {j + 1}-{i === playerSlices.length - 1 ? players.length : j + 25}
            </a>
          );
        })}
      </section>
      <section>
        {playerSlices.map((slice, i) => (
          <article
            className={cssClasses.tableContainer}
            $init={(element) => {
              if (i === pageObs.value) element.classList.add(cssClasses.visible);
              pageObs.subscribe((value) => {
                value === i
                  ? element.classList.add(cssClasses.visible, cssClasses.fadeIn)
                  : element.classList.remove(cssClasses.visible, cssClasses.fadeIn);
              });
            }}
          >
            <PlayersTable players={slice} clearCache={clearCache} />
          </article>
        ))}
      </section>
    </>
  );
}
