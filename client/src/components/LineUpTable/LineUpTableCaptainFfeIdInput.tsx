import { PropertyAccessors } from "@src/utils/create-accessors.js";
import { Match } from "@src/types.js";

export default function LineUpTableCaptainFfeIdInput({
  getFfeId,
  captainFfeIdAccessors,
}: {
  getFfeId: () => string | null;
  captainFfeIdAccessors: PropertyAccessors<Match, "captainFfeId">;
}) {
  const initialFfeId = captainFfeIdAccessors.get();

  return (
    <input
      type="radio"
      name="captain"
      checked={initialFfeId !== null && initialFfeId === getFfeId()}
      $init={(element) => {
        element.addEventListener("change", () => {
          if (!element.checked) return;

          const ffeId = getFfeId();

          if (ffeId)
            captainFfeIdAccessors.set(ffeId);
          else
            element.checked = false;
        });
      }}
    />
  );
}
