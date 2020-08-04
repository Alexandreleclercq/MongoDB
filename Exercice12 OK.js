// Suppression de documents

// db.collection.remove(query, options)


// Importer le fichier seas.json
mongoimport--db mondial--collection seas--file seas.json
// Suppression de tous les enregistrements
db.seas.remove({});

// Réimporter !! ;-)


// Supprimer l'océan Atlantique
db.seas.remove({ name: /atlantic/gi });

// Supprimer les mers bordant l'océan atlantique
db.seas.remove({ bordering: /atlantic/gi });

// Quelle est la mer la plus profonde ?
var allSeas = db.seas.find();

db.seas.find({}, { name: 1, depth: 1, _id: 0 }
).sort({ depth: -1 }).limit(1);

// Pacific Ocean is the deepest ocean

// Ajouter la mer 'Océan Atlantique'
db.seas.insert({
  "secureName": "sea-Atlantic",
  "country": "F E GBZ IS IRL GB P AG BS BDS CDN USA C WD DOM RH WG KN WL WV TT RA BR RCH ROU FGU GUY SME YV RIM MA WSA ANG RCB NAM ZRE BEN WAN RT RSA CI GH CAM GQ G CV RG LB WAG SN GNB WAL NLSM SMAR SBAR STP PR AXA GUAD MART BVIR MNTS VIRG HELX FALK SPMI BERM TUCA SVAX GROX FARX",
  "bordering": "sea-Mittelmeer sea-Channel sea-Irische_See sea-Nordsee sea-NorwegianSea sea-Greenlandsea sea-LabradorSea sea-Golf_von_Mexiko sea-Caribbean sea-Indic",
  "name": "Atlantic Ocean",
  "depth": 9219,
})

// Ajouter un tableau à toutes les mers   
db.seas.updateMany(
  {},
  { $set: { newArray: [] } }
)

// Quelle est la profondeur cumulé de toutes les mers ?
db.seas.aggregate([
  { $group: { _id: "allSeas", totalDepths: { $sum: "$depth" } } }
])