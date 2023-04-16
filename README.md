# SuperNova

# FrontEnd :
La partie client est en cours de développement dans le dossier "src".

# BackEnd :

## INSTALATION
Faire un npm init/install à la racine du fichier supernova (où se trouve le package.json).

## Présentation
Le backend est développé en utilisant la pile technologique MERN, qui comprend MongoDB comme base de données, Express comme framework de développement web, React pour l'interface utilisateur et Node.js pour le serveur backend. Ce backend fournit les fonctionnalités nécessaires pour gérer les utilisateurs et les publications de messages.

## Services Développés et Fonctionnels
Le backend offre les services suivants :

### Gestion des Utilisateurs
- Enregistrement d'un nouvel utilisateur : L'utilisateur peut s'inscrire avec un nom, un nom d'utilisateur (username), une adresse e-mail et un mot de passe à l'aide de la route POST /api/auth/register. Le mot de passe de l'utilisateur est crypté avant d'être stocké dans la base de données.
- Connexion d'un utilisateur : Les utilisateurs enregistrés peuvent se connecter en fournissant leur adresse e-mail et leur mot de passe à l'aide de la route POST /api/auth/login. Le backend vérifie les informations d'identification de l'utilisateur et génère un jeton d'authentification valide pour être utilisé dans les requêtes ultérieures.
- Modification d'un utilisateur : Les utilisateurs peuvent mettre à jour leurs informations de compte, y compris leur nom d'utilisateur, leur adresse e-mail et leur mot de passe à l'aide de la route PUT /api/users/:id. Les utilisateurs sont autorisés à modifier leur propre compte ou le compte d'un autre utilisateur s'ils sont administrateurs.
- Suppression d'un utilisateur : Les utilisateurs peuvent supprimer leur propre compte ou le compte d'un autre utilisateur s'ils sont administrateurs à l'aide de la route DELETE /api/users/:id.


### Gestion des Publications
- Création d'une publication : Les utilisateurs authentifiés peuvent créer une nouvelle publication avec un message et une image en utilisant la route POST /api/posts. La publication est associée à l'utilisateur qui l'a créée.
- Modification d'une publication : Les utilisateurs authentifiés peuvent mettre à jour leurs propres publications en utilisant la route PUT /api/posts/:id. Seuls les auteurs des publications sont autorisés à les modifier.
- Suppression d'une publication : Les utilisateurs authentifiés peuvent supprimer leurs propres publications en utilisant la route DELETE /api/posts/:id. Seuls les auteurs des publications sont autorisés à les supprimer.
- Récupération des publications de sa "Timeline" : Les utilisateurs peuvent récupérer ses publications existantes ainsi que celle des utilisateurs qu'il suit à l'aide de la route GET /api/posts/timeline/all. Les publications sont renvoyées avec les informations de l'utilisateur qui les a créées.
- Système de likes : Les utilisateurs peuvent aimer les publications d'autres utilisateurs, et retirer les likes si nécessaire. Cela utilise la route PUT /api/posts/:id/like qui like ou retire le like d'un utilisateur sur un post.

### Gestion des Relations d'Abonnement
- Suivre un utilisateur : Les utilisateurs authentifiés peuvent suivre d'autres utilisateurs en utilisant la route PUT /api/users/:id/follow. Un utilisateur ne peut pas se suivre lui-même et ne peut suivre qu'un utilisateur une seule fois.
- Ne plus suivre un utilisateur : Les utilisateurs authentifiés peuvent arrêter de suivre un utilisateur en utilisant la route PUT /api/users/:id/unfollow. Les utilisateurs peuvent uniquement arrêter de suivre des utilisateurs qu'ils ont précédemment suivis.

### Services Prévus
Les fonctionnalités suivantes sont prévues pour le backend :

- Système de recherche d'utilisateurs : Les utilisateurs pourront rechercher d'autres utilisateurs en utilisant des critères tels que le nom d'utilisateur, le nom réel, ou d'autres informations de profil. Cela sera mis en œuvre en utilisant une route GET /api/users/search qui renverra les utilisateurs correspondant aux critères de recherche.
- Affichage du nom et photo de profile de l'utilisateur à la page prinicipale. Cela sera mis en œuvre en utilisant une route GET /api/users/ qui renverra le nom et photo de profile.
- Mettre une photo de profile de l'utilisateur à travers la page de gestion de profile. 
- Système de pagination pour les publications : Actuellement, toutes les publications sont renvoyées en une seule requête, ce qui peut devenir inefficace lorsque le nombre de publications augmente. Un système de pagination sera mis en place pour limiter le nombre de publications renvoyées à la fois, améliorant ainsi les performances et l'expérience utilisateur.
