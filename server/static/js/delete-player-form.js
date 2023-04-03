document.querySelectorAll(".delete-player-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (confirm("Êtes-vous sûr(e) de vouloir supprimer ce joueur ?"))
      form.submit();
  });
});