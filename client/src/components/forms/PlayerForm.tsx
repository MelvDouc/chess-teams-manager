import Form from "@src/components/Form/Form.jsx";
import auth from "@src/utils/auth.js";
import { getDatePortion } from "@src/utils/date-formatter.js";
import { playersCache } from "@src/utils/local-storage.js";
import { Player, PlayerRole } from "@src/types.js";

export default function PlayerForm({ player, handleSubmit }: {
  player: Player | null;
  handleSubmit: (player: Player) => void | Promise<void>;
}): HTMLFormElement {
  const p: Player = player ?? {
    ffeId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "USER"
  };
  const role = auth.getUser()?.role;

  return (
    <Form
      onsubmit={(e) => {
        e.preventDefault();
        playersCache.clear();
        handleSubmit(p);
      }}
    >
      <div className="container d-flex flex-column gap-3 p-3">
        <section className="row">
          <article className="col-12 col-sm-3">
            <Form.Group
              type="text"
              nameAndId="ffe-id"
              labelText="N° FFE"
              pattern="[A-Z]\d+"
              value={p.ffeId}
              handleInput={(ffeId: string) => p.ffeId = ffeId.trim()}
              disabled={player !== null}
              required={player === null}
            />
          </article>
          <article className="col-12 col-sm-5">
            <Form.Group
              type="number"
              nameAndId="fide-id"
              labelText="N° FFE"
              value={p.fideId}
              handleInput={(fideId: number) => isNaN(fideId) ? (delete p.fideId) : (p.fideId = fideId)}
            />
          </article>
          <article className="col-12 col-sm-4">
            <Form.Group
              type="text"
              nameAndId="membership"
              labelText="Type d'adhérent"
              value={p.membership ?? ""}
              handleInput={(membership: string) => p.membership = membership.trim()}
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12 col-sm-4">
            <Form.Group
              type="text"
              nameAndId="first-name"
              labelText="Prénom"
              value={p.firstName}
              handleInput={(firstName: string) => p.firstName = firstName.trim()}
              required
            />
          </article>
          <article className="col-12 col-sm-4">
            <Form.Group
              type="text"
              nameAndId="last-name"
              labelText="NOM"
              value={p.lastName}
              handleInput={(lastName: string) => p.lastName = lastName.trim().toUpperCase()}
              required
            />
          </article>
          <article className="col-12 col-sm-4">
            <Form.Group
              type="date"
              nameAndId="birth-date"
              labelText="Date de naissance"
              value={p.birthDate ? getDatePortion(new Date(p.birthDate)) : ""}
              handleInput={(birthDate) => {
                (birthDate)
                  ? (p.birthDate = birthDate)
                  : (delete p.birthDate);
              }}
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12 col-sm-9">
            <Form.Group
              type="email"
              nameAndId="email"
              labelText="Adresse email"
              value={p.email}
              handleInput={(email) => p.email = email.trim()}
              required
            />
          </article>
          <article className="col-12 col-sm-3">
            <Form.Group
              type="number"
              nameAndId="rating"
              labelText="Elo"
              value={p.rating}
              handleInput={(rating) => {
                (rating != null)
                  ? (p.rating = rating)
                  : (delete p.rating);
              }}
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="phone1"
              labelText="Tél. 1"
              value={p.phone1 ?? ""}
              handleInput={(phoneNumber: string) => {
                (phoneNumber)
                  ? (p.phone1 = phoneNumber.trim())
                  : (delete p.phone1);
              }}
            />
          </article>
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="phone1"
              labelText="Tél. 2"
              value={p.phone1 ?? ""}
              handleInput={(phoneNumber: string) => {
                (phoneNumber)
                  ? (p.phone1 = phoneNumber.trim())
                  : (delete p.phone1);
              }}
            />
          </article>
        </section>
        <section className="row">
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="team1"
              labelText="Équipe 1"
              value={p.team1 ?? ""}
              handleInput={(teamName: string) => {
                (teamName)
                  ? (p.team1 = teamName)
                  : (delete p.team1);
              }}
            />
          </article>
          <article className="col-12 col-sm-6">
            <Form.Group
              type="text"
              nameAndId="team2"
              labelText="Équipe 2"
              value={p.team2 ?? ""}
              handleInput={(teamName: string) => {
                (teamName)
                  ? (p.team2 = teamName)
                  : (delete p.team2);
              }}
            />
          </article>
        </section>
        <section className="row">
          <article className="col">
            <Form.Radio
              id="gender-male"
              name="gender"
              labelText="Homme"
              checked={p.isMale}
              handleInput={(checked) => p.isMale = checked}
            />
            <Form.Radio
              id="gender-female"
              name="gender"
              labelText="Femme"
              checked={p.isMale === false}
              handleInput={(checked) => p.isMale = !checked}
            />
          </article>
          <article className="col">
            <label htmlFor="role" className="form-label">Rôle</label>
            <select
              id="role"
              className="form-control"
              onchange={({ target }) => p.role = (target as HTMLSelectElement).value as PlayerRole}
            >
              <option value="USER" selected={p.role === "USER"}>Utilisateur</option>
              <option value="CAPTAIN" selected={p.role === "CAPTAIN"}>Capitaine</option>
              {(role === "WEBMASTER" || role === "ADMIN") && (
                <option value="ADMIN" selected={p.role === "ADMIN"}>Admin</option>
              )}
            </select>
          </article>
        </section>
        <Form.Submit text="Valider" backLink="/joueurs" />
      </div>
    </Form>
  );
}