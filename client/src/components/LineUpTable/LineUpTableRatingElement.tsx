import { Match } from "@src/types.js";
import cssClasses from "./styles.module.scss";

export default function LineUpTableRatingElement({ board, lineUpObs }: {
  board: number;
  lineUpObs: Obs<Match["lineUp"]>;
}) {
  return (
    <input
      type="number"
      className={cssClasses.ratingElement}
      value={lineUpObs.value[board]?.rating ?? ""}
      oninput={({ target }) => {
        const rating = (target as HTMLInputElement).valueAsNumber;
        if (!isNaN(rating) && lineUpObs.value[board])
          lineUpObs.value[board]!.rating = rating;
      }}
      $init={(element) => {
        lineUpObs.subscribe((lineUp) => {
          element.value = String(lineUp[board]?.rating ?? "");;
        });
      }}
    />
  );
}