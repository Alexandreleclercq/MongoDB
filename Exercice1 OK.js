// Votre serveur mongod est démarré automatiquement au démarrage de votre machine
// Pour utiliser le shell mongo (mongo client)
// Dans un terminal :
// // Vous vous placez dans le dossier des binaires de mongo
// cd 'C:\Program Files\MongoDB\Server\4.2\bin\'
// // Vous démarrez le shell
// ./mongo (si votre terminal est un powershell)
// mongo (si c'est un cmd )

// // Afficher la liste des bases de données disponibles dans mongo
// show dbs
// show databases

// // Pour sélectionner une base de données
// use videoclub

// // Afficher la liste des collections de la base de données courante
// show collections

// // Pour connaitre la bdd courante
// db

// // On va insérer un enregistrement dans une collection films
// db.films.insert({
//     titre : "Retour vers le futur",
//     duree : 180
// })

// // Sur une base de données il faut savoir 4 types d'opération
// C create    : pour insérer des documents
// R read      : pour lire des documents
// U update    : pour mettre à jour des documents
// D delete    : pour supprimer des documents

// // Pour une insertion multiple
// db.films.insert(
//     [
//         {
//             titre: "Madmax",
//             duree : 240
//         },
//         {
//             titre : " Matrix",
//             duree : 210
//         }
//     ]
// )

// // Pour compter les docuements d'une collection
// db.films.count()

// // Pour afficher les films
// db.films.find()
// // Afficher les documents avec une mise en forme
// db.films.find().pretty()

// // Pour n'afficher qu'un seul docuemtn de manière pretty
// db.films.findOne()

// db.acteurs.insert({ prenom: "Fernandel"})

// db.films.insert({
//     titre : "La vache et le prisonnier",
//     duree : 119,
//     acteurs : [
//         { prenom: "Fernandel"},
//         { prenom : "René", nom : "Havard" }
//     ],
//     realisateur : { prenom : "Henri", nom : " Verneuil"},
//     annee_sortie : 1959
// })

// var maDate = new Date();
// db.films.insert({
//     titre : "Nouveau film",
//     created : maDate
// })
