import { Player } from "@types";
import Form from "@components/Form/Form.jsx";

export default function PlayerForm({ player, handleSubmit }: {
  player: Player;
  handleSubmit: (e: SubmitEvent) => any;
}) {
  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="N° FFE"
          nameAndId="ffeId"
          value={player.ffeId}
          required={true}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fideId"
          value={player.fideId}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="firstName"
          value={player.firstName}
          required={true}
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="lastName"
          value={player.lastName}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="email"
          labelText="Email"
          nameAndId="email"
          value={player.email}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Tél."
          nameAndId="phone"
          value={player.phone}
        />
        <Form.Group
          type="number"
          labelText="Elo"
          nameAndId="rating"
          value={player.rating}
        />
      </Form.Row>
      <Form.Submit text="Valider" backLink="/joueurs" />
    </Form>
  );
}