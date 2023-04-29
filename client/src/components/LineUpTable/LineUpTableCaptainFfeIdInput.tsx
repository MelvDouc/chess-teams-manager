import { PropertyAccessors } from "@src/utils/create-accessors.js";
import { Match } from "@src/types.js";

export default function LineUpTableCaptainFfeIdInput({ getFfeId, captainFfeIdAccessors }: {
  getFfeId: () => string | null;
  captainFfeIdAccessors: PropertyAccessors<Match, "captainFfeId">;
}) {
  return (
    <input
      type="radio"
      name="captain"
      checked={captainFfeIdAccessors.get() === getFfeId()}
      onchange={(e) => {
        if ((e.target as HTMLInputElement).checked) {
          const ffeId = getFfeId();

          if (!ffeId) {
            (e.target as HTMLInputElement).checked = false;
            return;
          }

          captainFfeIdAccessors.set(ffeId);
        }
      }}
    />
  );
}