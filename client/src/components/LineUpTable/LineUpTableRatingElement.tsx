import { Match } from "@src/types.js";

export default function LineUpTableRatingElement({ board, lineUpObs }: {
  board: number;
  lineUpObs: Obs<Match["lineUp"]>;
}) {
  return (
    <div
      contentEditable="true"
      $init={(element) => {
        element.addEventListener("input", () => {
          const rating = Number(element.innerText);
          if (isNaN(rating))
            return;
          lineUpObs.value[board].rating = rating;
          lineUpObs.notify();
        });
        lineUpObs.subscribe((value) => {
          element.innerText = String(value[board].rating ?? "");
        });
      }}
    >{lineUpObs.value[board].rating}</div>
  );
}