import { Observable } from "reactfree-jsx";
import Form from "@src/components/Form/Form.jsx";
import { DbEntities, WithoutId } from "@src/types.js";

export default function ClubForm({ club, handleSubmit }: {
  club: DbEntities.Club | null;
  handleSubmit: (club: WithoutId<DbEntities.Club>) => any;
}) {
  const clubObs = new Observable<WithoutId<DbEntities.Club>>(club ?? {
    name: "",
    address: "",
    email: null,
    phone: null,
  });

  return (
    <Form handleSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit(clubObs.value);
    }}>
      <Form.Row>
        <Form.Group
          nameAndId="name"
          type="text"
          labelText="Nom"
          value={club?.name}
          updateValue={(name) => clubObs.value.name = name}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          nameAndId="address"
          type="textarea"
          labelText="Adresse"
          value={club?.address}
          updateValue={(address) => clubObs.value.address = address}
          required
        />
      </Form.Row>
      <Form.Row>
        <Form.Group
          nameAndId="phone"
          type="text"
          labelText="Tél."
          value={club?.phone}
          updateValue={(phone) => clubObs.value.phone = phone || null}
        />
        <Form.Group
          nameAndId="email"
          type="email"
          labelText="Email"
          value={club?.email}
          updateValue={(email) => clubObs.value.email = email || null}
        />
      </Form.Row>
      <Form.Submit text="Envoyer" backLink="/clubs" />
    </Form>
  );
}