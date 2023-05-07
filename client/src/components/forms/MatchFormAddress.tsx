import Form from "@src/components/Form/Form.jsx";
import { Match } from "@src/types.js";
import cssClasses from "@src/components/Form/Form.module.scss";

export default function MatchFormAddress({ fullAddress }: { fullAddress: FullAddress; }) {
  return (
    <>
      <article className="col-12 col-sm-7 d-flex flex-column">
        <label htmlFor="address" classNames={["form-label", cssClasses.required]}>Adresse</label>
        <textarea
          id="address"
          className="h-100 form-control"
          oninput={({ target }) => fullAddress.address = (target as HTMLTextAreaElement).value.trim()}
        >{fullAddress.address || homeAddress.address}</textarea>
      </article>
      <article className="col-12 col-sm-5 d-flex flex-column gap-2">
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
