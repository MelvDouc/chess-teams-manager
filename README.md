GET /(accueil)?

GET, POST   /connexion
DELETE      /deconnexion
GET, POST   /oubli-nouveau-mot-de-passe
GET, POST   /nouveau-mot-de-passe/:passwordResetId

GET         /joueurs
GET         /joueurs/:ffeId
GET, POST   /joueurs/nouveau
GET, PATCH  /joueurs/:ffeId/modifier
DELETE      /joueurs/:ffeId/supprimer

GET         /matchs
GET         /matchs/:id
GET, POST   /matchs/nouveau
GET, PATCH  /matchs/:id/modifier
DELETE      /matchs/:id/supprimer