import Form from "@src/components/Form/Form.jsx";
import { DbEntities } from "@src/types.js";

export default function PlayerForm({ player, handleSubmit }: {
  player: DbEntities.Player | null;
  handleSubmit: (player: DbEntities.Player) => void;
}) {
  const p = player ?? {
    ffe_id: "",
    fide_id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: null,
    rating: 1199
  };

  return (
    <Form handleSubmit={async (e) => {
      e.preventDefault();
      handleSubmit(p);
    }}>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="N° FFE"
          nameAndId="ffe_id"
          value={player?.ffe_id}
          updateValue={(ffe_id) => p.ffe_id = ffe_id}
          required={true}
        />
        <Form.Group
          type="number"
          labelText="N° FIDE"
          nameAndId="fide_id"
          value={player?.fide_id}
          updateValue={(fide_id) => p.fide_id = Number(fide_id) || null}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Prénom"
          nameAndId="first_name"
          value={player?.first_name}
          updateValue={(first_name) => p.first_name = first_name}
          required={true}
        />
        <Form.Group
          type="text"
          labelText="NOM"
          nameAndId="last_name"
          value={player?.last_name}
          updateValue={(last_name) => p.last_name = last_name.toUpperCase()}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="email"
          labelText="Email"
          nameAndId="email"
          value={player?.email}
          updateValue={(email) => p.email = email}
          required={true}
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          type="text"
          labelText="Tél."
          nameAndId="phone"
          value={player?.phone}
          updateValue={(phone) => p.phone = phone}
        />
        <Form.Group
          type="number"
          labelText="Elo"
          nameAndId="rating"
          value={player?.rating}
          updateValue={(rating) => (!isNaN(Number(rating))) && (p.rating = Number(rating))}
        />
      </Form.Row>
      <Form.Submit text="Valider" backLink="/joueurs" />
    </Form>
  );
}