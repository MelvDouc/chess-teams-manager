import Form from "@src/components/Form/Form.jsx";
import { Match } from "@src/types.js";

export default function MatchFormAddress({ fullAddress }: { fullAddress: FullAddress; }) {
  return (
    <>
      <article className="col-12 col-sm-6">
        <Form.Group
          type="textarea"
          nameAndId="address"
          labelText="Adresse"
          value={fullAddress.address || homeAddress.address}
          handleInput={(address: string) => fullAddress.address = address.trim()}
          required
        />
      </article>
      <article className="col col-sm-6 d-flex flex-column gap-2">
        <div>
          <Form.Group
            type="text"
            nameAndId="city"
            labelText="Ville"
            value={fullAddress.city || homeAddress.city}
            handleInput={(city: string) => fullAddress.city = city.trim()}
            required
          />
        </div>
        <div>
          <Form.Group
            type="text"
            nameAndId="zip-code"
            labelText="Code postal"
            value={fullAddress.zipCode || homeAddress.zipCode}
            handleInput={(zipCode: string) => fullAddress.zipCode = zipCode.trim()}
            required
          />
        </div>
      </article>
    </>
  );
}

const homeAddress = Object.freeze({
  address: "3 rue du cygne",
  city: "Thionville",
  zipCode: "57100"
});

type FullAddress = Pick<Match, "address" | "city" | "zipCode">;
