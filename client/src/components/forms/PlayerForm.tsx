import Form from "@src/components/Form/Form.jsx";
import playerRoles from "@src/utils/player-roles.js";
import { playersCache } from "@src/utils/local-storage.js";
import { Player } from "@src/types.js";

export default function PlayerForm({ player, handleSubmit }: {
  player: Player | null;
  handleSubmit: (player: Omit<Player, "pwd" | "pwdResetId">) => void | Promise<void>;
}) {
  const p: Omit<Player, "pwd" | "pwdResetId"> = player ?? {
    ffeId: "",
    fideId: null,
    firstName: "",
    lastName: "",
    email: "",
    role: "USER",
    phone: null,
    rating: 1199
  };

  return (
    <Form handleSubmit={(e) => {
      e.preventDefault();
      playersCache.clear();
      handleSubmit(p);
    }}>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="N° FFE"
          nameAndId="ffeId"
          value={p.ffeId}
          updateValue={(ffeId) => p.ffeId = ffeId}
          disabled={player !== null}
          required={player === null}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fideId"
          value={p.fideId}
          updateValue={(fideId) => p.fideId = Number(fideId) || null}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="first_name"
          value={p.firstName}
          updateValue={(firstName) => p.firstName = firstName}
          required={true}
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="last_name"
          value={p.lastName}
          updateValue={(lastName) => p.lastName = lastName.toUpperCase()}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="email"
          labelText="Email"
          nameAndId="email"
          value={p.email}
          updateValue={(email) => p.email = email}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Select
          labelText="Rôle"
          nameAndId="role"
          required
          values={playerRoles.map((role) => ({
            text: role,
            value: role,
            selected: p.role === role
          }))}
          updateValue={(role) => p.role = role}
        />
        <Form.Group
          type="text"
          labelText="Tél."
          nameAndId="phone"
          value={p.phone}
          updateValue={(phone) => p.phone = phone}
        />
        <Form.Group
          type="number"
          labelText="Elo"
          nameAndId="rating"
          value={p.rating}
          updateValue={(rating) => (!isNaN(Number(rating))) && (p.rating = Number(rating))}
        />
      </Form.Row>
      <Form.Row>
        <Form.Submit text="Valider" backLink="/joueurs" />
      </Form.Row>
    </Form>
  );
}