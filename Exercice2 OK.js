// mongoimport --db paris --collection piscines --file 'C:\Users\Famille Masson-Ly\Desktop\Exercice MongoDB\data\piscines_paris.json'

// db.piscines.find(
//   {zipCode: 75011},
//   {name: 1, zipCode: 1}
// )

// use paris

// Pour compter les éléments

// ou

// Pour les piscines du 11ème

// Pour les piscines du 11ème, n'affichez que les champs nom et code postal

// La projection sert à limiter les champs renvoyés par une requête

// Par défaut, le champ _id est présent. Il faut l'exclure explicitement

// db.piscines.find(
//   {zipCode: 75011},
//   {name: 1, zipCode: 1, _id: 0}
// )

// Pour limiter le nombre de résultats, on utilise

// Pour trier par nom

// db.piscines.find({}, { name: 1, _id: 0 }).sort({ name: 1 });
