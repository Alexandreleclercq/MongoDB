// Aggrégation

// Importer dans une base le fichier website.json
mongoimport--file website.json--db websites--collection sites

use websites

// Quel est l'hébergeur qui héberge le plus de sites ?
db.sites.aggregate([{ $sortByCount: "$hebergeur" }, { $limit: 1 }]);

// db.sites.aggregate(
//   [
//       { $match : {} }, // je veux travailler sur tous les documents
//       { $group : { _id : "$hebergeur", nbSites : { $sum : 1 } }}, // on groupe par hébergeur
//       { $sort : { nbSites : -1 } }
//   ]
// )

// Pour l'hébergeur gandi, quel site a le plus de traffic
db.sites.aggregate([{ $match: { hebergeur: /gandi/gi } }, { $sort: { traffic: -1 } }])

// Le tri n'est pas cohérent car le traffic est un string...
// On va modifier nos documents pour que le traffic soit un entier
// avec un update
let allSites = db.sites.find();

allSites.forEach(oneSite => {
  // print(oneSite.traffic);
  // oneSite.traffic = parseInt(oneSite.traffic);
  db.sites.update(
    { _id: oneSite._id },
    { $set: { traffic: parseInt(oneSite.traffic) } }
  )
})

// avec le save()
allSites = db.sites.find()

allSites.forEach(oneSite => {
  oneSite.traffic = parseInt(oneSite.traffic);
  db.sites.save(oneSite);
})
// équivalent à

// Quel est le traffic cumulé des hébergeurs ? Qui est le premier ?

// Traffic cumulé de tous les hébergeurs
db.sites.aggregate(
  [
    { $match: {} },
    // On regroupe tous les documents en 1 seul en utilisant une chaine statique
    { $group: { _id: "azerty", trafficCumule: { $sum: "$traffic" } } }
  ]
)

// Quelle est la moyenne des likes par hébergeur ?
// les likes sont aussi en string, on les passe en int


// ou avec la méthode save()
var tousSites = db.sites.find()
tousSites.forEach(oneSite => {
  oneSite.likes = parseInt(oneSite.likes);
  db.sites.save(oneSite);
})

// On peut maintenant calculer la moyenne
db.sites.aggregate([
  { $match: {} },
  { $group: { _id: "$hebergeur", moyenneLikes: { $avg: "$likes" } } }
])

// Augmenter le nombre de 50 likes les sites de Gandi 
db.sites.updateMany(
  { hebergeur: "Gandi" },
  { $inc: { likes: 50 } }
)

// exporter dans un fichier newwebsite.json le contenu de notre collection
mongoexport--db websites--collection sites--out "C:\Users\VirtuoWorks\Desktop\Mongo\newwebsite.json"

// Cela permet de faire des sauvegardes ...



