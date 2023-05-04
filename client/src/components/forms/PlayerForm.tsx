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
    teams: [],
    rating: 1199,
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
          nameAndId="ffeId"
          value={p.ffeId}
          updateValue={(ffeId) => (p.ffeId = ffeId)}
          disabled={player !== null}
          required={player === null}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fideId"
          value={p.fideId}
          updateValue={(fideId: number) => (isNaN(fideId) ? delete p.fideId : (p.fideId = fideId))}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="first_name"
          value={p.firstName}
          updateValue={(firstName) => (p.firstName = firstName)}
          required={true}
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="last_name"
          value={p.lastName}
          updateValue={(lastName) => (p.lastName = lastName.toUpperCase())}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group type="email" labelText="Email" nameAndId="email" value={p.email} updateValue={(email) => (p.email = email)} required />
        <Form.Group
          type="date"
          nameAndId="birthDate"
          labelText="Date de naissance"
          value={p.birthDate ? getDatePortion(new Date(p.birthDate)) : ""}
          updateValue={(birthDate: Date | null) => {
            if (birthDate) p.birthDate = birthDate.toISOString();
            else delete p.birthDate;
          }}
        />
      </Form.Row>
      <Form.Row>
        <Form.Checkbox nameAndId="is-admin" labelText="Admin" checked={p.isAdmin} updateValue={(checked) => (p.isAdmin = checked)} required />
        <Form.Checkbox
          nameAndId="is-captain"
          labelText="Capitaine"
          checked={p.isCaptain}
          updateValue={(checked) => (p.isCaptain = checked)}
          required
        />
        <Form.Group type="text" labelText="Tél." nameAndId="phone" value={p.phone} updateValue={(phone) => (p.phone = phone)} />
        <Form.Group
          type="number"
          labelText="Elo"
          nameAndId="rating"
          value={p.rating}
          updateValue={(rating) => !isNaN(+rating) && (p.rating = +rating)}
        />
      </Form.Row>
      <Form.Row>
        <Form.Submit text="Valider" backLink="/joueurs" />
      </Form.Row>
    </Form>
  );
}
