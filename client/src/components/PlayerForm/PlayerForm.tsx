import { DbEntities } from "@types";
import Form from "@components/Form/Form.jsx";

export default function PlayerForm({ player, handleSubmit }: {
  player: DbEntities.Player;
  handleSubmit: (e: SubmitEvent) => any;
}) {
  return (
    <Form handleSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="N° FFE"
          nameAndId="ffe_id"
          value={player.ffe_id}
          required={true}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fide_id"
          value={player.fide_id}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="first_name"
          value={player.first_name}
          required={true}
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="last_name"
          value={player.last_name}
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