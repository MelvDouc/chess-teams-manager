import { Match } from "@src/types.js";
import cssClasses from "./styles.module.scss";

export default function LineUpTableRatingElement({ board, lineUpObs }: {
  board: number;
  lineUpObs: Obs<Match["lineUp"]>;
}) {
  return (
    <div
      contentEditable="true"
      className={cssClasses.ratingElement}
      oninput={({ target }) => {
        const rating = +(target as HTMLElement).innerText;
        if (!isNaN(rating) && lineUpObs.value[board])
          lineUpObs.value[board]!.rating = rating;
      }}
      $init={(element) => {
        lineUpObs.subscribe((lineUp) => {
          element.innerText = String(lineUp[board]?.rating ?? "");
        });
      }}
    >
      {lineUpObs.value[board]?.rating ?? ""}
    </div>
  );
}