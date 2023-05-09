export default function Footer(): HTMLElement {
  return (
    <footer className="bg-dark text-light text-center p-3 max-w-100">
      <div className="container-fluid">
        <section className="row">
          <article className="col-sm-3 d-flex justify-content-center align-items-center mb-2">
            <img src={import.meta.env.VITE_LOGO_URL} alt="Logo" width={48} height={48} />
          </article>
          <article className="col-sm-9">
            <p><em>{import.meta.env.VITE_SITE_TITLE} @2023</em></p>
            <p className="fs-6">Créé et maintenu par <a href="https://www.melvin-doucet.com/">Melvin Doucet</a> du club de Thionville Échecs.</p>
          </article>
        </section>
      </div>
    </footer>
  );
}