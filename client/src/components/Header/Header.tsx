import { Observable } from "reactfree-jsx";
import NavBarText from "./NavBarText.jsx";
import router from "@src/router.jsx";
import auth, { PlayerRole } from "@src/utils/auth.js";

export default function Header() {
  const hideLinksObs = new Observable(true);
  auth.onUserChange((user) => hideLinksObs.value = !user);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <router.link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img
              src="http://thionville-echecs.fr/wp-content/uploads/2022/05/cropped-logo-blanc2x-192x192.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <h1 className="m-0 white-space-pre-wrap fs-5">Thionville Échecs —&nbsp;Équipes</h1>
          </router.link>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li classes={{
                "nav-item": true,
                "d-none": hideLinksObs,
              }}>
                <router.link to="/matchs" className="nav-link">Matchs</router.link>
              </li>
              <li
                className="nav-item d-none"
                $init={(element) => {
                  auth.onUserChange((user) => {
                    (user && user.role <= PlayerRole.CAPTAIN)
                      ? element.classList.remove("d-none")
                      : element.classList.add("d-none");
                  });
                }}
              >
                <router.link to="/joueurs" className="nav-link">Joueurs</router.link>
              </li>
            </ul>
            <span className="navbar-text">
              <NavBarText
                user={auth.getUser()}
                onUserChange={auth.onUserChange}
                logOut={() => {
                  auth.logOut();
                  router.navigate("/connexion");
                }}
              />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}