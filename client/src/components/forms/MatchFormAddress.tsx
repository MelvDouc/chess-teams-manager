import Form from "@src/components/Form/Form.jsx";
import { Match } from "@src/types.js";

export default function MatchFormAddress({ fullAddress }: { fullAddress: FullAddress; }) {
  const eventBus = new EventTarget();
  const reset = (checked: boolean) => {
    eventBus.dispatchEvent(
      new CustomEvent("row_reset", { detail: { checked } })
    );
  };
  const $init = (key: keyof FullAddress) => {
    return (element: HTMLInputElement | HTMLTextAreaElement) => {
      element.addEventListener("input", () => {
        fullAddress[key] = element.value;
      });
      eventBus.addEventListener("row_reset", (e) => {
        if ((e as CustomEvent<{ checked: boolean; }>).detail.checked) {
          element.value = homeAddress[key];
          fullAddress[key] = homeAddress[key];
          return;
        }
        element.value = fullAddress[key];
      });
    };
  };

  return [
    <div className="h-100 d-flex flex-column">
      <label htmlFor="address" className="form-label">
        <span className="me-2">Adresse</span>
        <span>
          (
          <input
            type="checkbox"
            className="me-1"
            id="is-home"
            checked={fullAddress.address === homeAddress.address}
            onchange={({ target }) => reset((target as HTMLInputElement).checked)}
          />
          <label htmlFor="is-home">à domicile</label>
        </span>
        )
      </label>
      <textarea
        name="address"
        id="address"
        className="form-control h-100"
        value={fullAddress.address}
        $init={$init("address")}
        required
      ></textarea>
    </div>,
    <div className="h-100 d-flex flex-column gap-2">
      <Form.Group
        type="text"
        nameAndId="city"
        labelText="Ville"
        value={fullAddress.city}
        $init={$init("city")}
        required
      />
      <Form.Group
        type="text"
        nameAndId="zip-code"
        labelText="Code postal"
        value={fullAddress.zipCode}
        $init={$init("zipCode")}
        required
      />
    </div>
  ];
}

const homeAddress = {
  address: "3 rue du cygne",
  city: "Thionville",
  zipCode: "57100"
} as const;

type FullAddress = Pick<Match, "address" | "city" | "zipCode">;
