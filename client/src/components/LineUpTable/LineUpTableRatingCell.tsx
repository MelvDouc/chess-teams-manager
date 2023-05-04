import cssClasses from "./LineUpTable.module.scss";

export default function LineUpTableRatingCell({
  rating,
  setRating,
  onRatingChange,
}: {
  rating: number;
  setRating: (rating: number) => void;
  onRatingChange: (subscription: (rating: number) => void) => void;
}) {
  return (
    <div
      contentEditable="true"
      className={cssClasses.ratingElement}
      oninput={({ target }) => {
        const rating = +(target as HTMLElement).innerText;
        if (!isNaN(rating)) setRating(rating);
      }}
      $init={(element) => {
        onRatingChange((rating) => {
          if (rating !== +element.innerText) element.innerText = rating ? String(rating) : "";
        });
      }}
    >
      {rating ? String(rating) : ""}
    </div>
  );
}
