import Form from "@src/components/Form/Form.jsx";
import { getDatePortion } from "@src/utils/date-formatter.js";
import { playersCache } from "@src/utils/local-storage.js";
import { Player } from "@src/types.js";

export default function PlayerForm({
  player,
  handleSubmit,
}: {
  player: Player | null;
  handleSubmit: (player: Player) => void | Promise<void>;
}): HTMLFormElement {
  const p: Player = player ?? {
    ffeId: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  return (
    <Form
      handleSubmit={(e) => {
        e.preventDefault();
        playersCache.clear();
        handleSubmit(p);
      }}
    >
      <Form.Row>
        <Form.Group
          type="text"
          labelText="N° FFE"
          nameAndId="ffe-id"
          value={p.ffeId}
          updateValue={(ffeId) => p.ffeId = ffeId}
          disabled={player !== null}
          required={player === null}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fide-id"
          value={p.fideId ?? ""}
          updateValue={(fideId: number) => {
            isNaN(fideId)
              ? (delete p.fideId)
              : p.fideId = fideId;
          }}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="first-name"
          value={p.firstName}
          updateValue={(firstName) => p.firstName = firstName}
          required
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="last-name"
          value={p.lastName}
          updateValue={(lastName) => p.lastName = lastName.toUpperCase()}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="email"
          labelText="Email"
          nameAndId="email"
          value={p.email}
          updateValue={(email) => p.email = email}
          required
        />
        <Form.Group
          type="date"
          nameAndId="birth-date"
          labelText="Date de naissance"
          value={p.birthDate ? getDatePortion(new Date(p.birthDate)) : ""}
          updateValue={(birthDate: Date | null) => {
            (birthDate instanceof Date)
              ? (p.birthDate = birthDate)
              : (delete p.birthDate);
          }}
        />
      </Form.Row>
      <Form.Row>
        <div className="d-flex flex-column gap-2">
          <Form.Group
            type="text"
            labelText="Tél. 1"
            nameAndId="phone1"
            value={p.phone1}
            updateValue={(phone1) => {
              phone1
                ? (p.phone1 = phone1)
                : (delete p.phone1);
            }}
          />
          <Form.Group
            type="text"
            labelText="Tél. 2"
            nameAndId="phone2"
            value={p.phone2}
            updateValue={(phone2) => {
              phone2
                ? (p.phone2 = phone2)
                : (delete p.phone2);
            }}
          />
        </div>
        <Form.Group
          type="number"
          labelText="Elo"
          nameAndId="rating"
          value={p.rating}
          updateValue={(rating: number) => {
            isNaN(rating)
              ? (delete p.rating)
              : p.rating = rating;
          }}
        />
        <div className="d-flex flex-wrap gap-2 pt-2">
          <Form.Checkbox
            nameAndId="is-admin"
            labelText="Admin"
            checked={p.isAdmin}
            updateValue={(checked) => p.isAdmin = checked}
          />
          <Form.Checkbox
            nameAndId="is-captain"
            labelText="Capitaine"
            checked={p.isCaptain}
            updateValue={(checked) => p.isCaptain = checked}
          />
        </div>
      </Form.Row>
      <Form.Row>
        <Form.Submit text="Valider" backLink="/joueurs" />
      </Form.Row>
    </Form>
  );
}
