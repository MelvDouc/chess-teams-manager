GET /(accueil)?

GET, POST /connexion
DELETE    /deconnexion
GET, POST /demande-nouveau-mot-de-passe
GET, POST /reinitialiser-mot-de-passe/:passwordResetId

GET         /joueurs
GET         /joueurs/:ffeId
GET, POST   /joueurs/creer
GET, PATCH  /joueurs/:ffeId/modifier
DELETE      /joueurs/:ffeId/supprimer

GET         /matchs
GET         /matchs/:id
GET, POST   /matchs/creer
GET, PATCH  /matchs/:id/modifier
DELETE      /matchs/:id/supprimer