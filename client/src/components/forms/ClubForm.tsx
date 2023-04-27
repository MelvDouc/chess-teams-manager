import Form from "@src/components/Form/Form.jsx";
import { PublicEntities, WithoutId } from "@src/types.js";

export default function ClubForm({ club, handleSubmit }: {
  club: PublicEntities.Club | null;
  handleSubmit: (club: WithoutId<PublicEntities.Club>) => any;
}) {
  const c = club ?? {
    name: "",
    address: "",
    email: null,
    phone: null,
  };

  return (
    <Form handleSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit(c);
    }}>
      <Form.Row>
        <Form.Group
          nameAndId="name"
          type="text"
          labelText="Nom"
          value={c.name}
          updateValue={(name) => c.name = name}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          nameAndId="address"
          type="textarea"
          labelText="Adresse"
          value={c.address}
          updateValue={(address) => c.address = address}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          nameAndId="phone"
          type="text"
          labelText="Tél."
          value={c.phone}
          updateValue={(phone) => {
            phone = (phone ?? "").replace(/\s+/g, "");
            c.phone = phone || null;
          }}
        />
        <Form.Group
          nameAndId="email"
          type="email"
          labelText="Email"
          value={c.email}
          updateValue={(email) => c.email = email || null}
        />
      </Form.Row>
      <Form.Submit text="Envoyer" backLink="/clubs" />
    </Form>
  );
}