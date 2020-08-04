// Revenez sur la base "videoclub"
// use videoclub

db.films.insert({
  titre: "La vache et le prisonnier", duree: 119, acteurs: [{ prenom: "Fernandel" }, { prenom: "René", nom: "Havard" }],
  realisateur: { prenom: "Henri", nom: " Verneuil" },
  annee_sortie: 1959
})

// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)
db.films.find({ titre: { $regex: /(vache)/ } });

// équivalent
db.films.find({ titre: /(vache)/gm }).pretty();

// Afficher uniquement le prenom des acteurs de ce film
db.films.find({ titre: /(vache)/gm }, { "acteurs.prenom": 1, _id: 0 })

// Trouver les films dont un acteur s'appelle René
db.films.find({ "acteurs.prenom": /rene|é/gi })