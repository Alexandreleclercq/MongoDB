// Importer dans une base us, dans la collection companies le fichier companies.json
mongoimport--db us--collection companies--file companies.json
// Quelle est la société la plus ancienne ?
db.companies.find({ founded_year: { $not: { $eq: null } } }, { name: 1, _id: 0, founded_year: 1 }).sort({ founded_year: 1 }).limit(1);



// Ce traitement dépasse la mémoire max autorisée par Mongo.
// On doit créer un index pour pouvoir la traiter
db.companies.createIndex({ founded_year: 1 });


// Quelle est la société qui emploie le plus de personnes ?
db.companies.createIndex({ number_of_employees: 1 })
db.companies.find({}, { name: 1, number_of_employees: 1, _id: 0 }).sort({ number_of_employees: -1 }).limit(1);

// Quelle est la société qui emploie le plus de personnes dans la publicité ?
db.companies.find({ category_code: /advertising/gi }, { name: 1, number_of_employees: 1, _id: 0 }).sort({ number_of_employees: -1 }).limit(1);

// Quel est l'effectif cumulé des entreprises de 'network_hosting' ?
db.companies.aggregate([
  { $match: { category_code: /network_hosting/gi } },
  { $group: { _id: "networkcompanies", effectif: { $sum: "$number_of_employees" } } }
])

// Quelle entreprise est dirigée par Rich Langdale ?
db.companies.find({ "relationships.person.first_name": "Rich", "relationships.person.last_name": "Langdale" }, { name: 1, _id: 0 });

// Supprimer les entreprises de finance
db.companies.remove({ category_code: "finance" });

// Mettre à jour les entreprises de publicité en leur ajoutant un champ 'likes'
db.companies.update(
  { category_code: /advert/gi },
  { $set: { likes: 0 } },
  { multi: true }
)

// Créer un index sur le champ nom de la compagnie
db.companies.createIndex({ name: 1 });

// Supprimer cet index
db.companies.dropIndex('name_1');

// Recréer l'index en spécifiant que la valeur doit être unique
db.companies.createIndex({ name: 1 }, { unique: true });

// Cela déclenche une erreur : mongo ne peut pas créer l'index unique car il y a des doublons dans le nom des entreprises

// Insérer une société My Little Compagnie en respectant l'organisation actuelle de la base
db.companies.insert({
  name: "My Little Company",
  number_of_employees: 1,
  founded_year: 2020
})

// Trouver les sociétés qui ont un bureau situé à moins de 20 kilomètres de la statue de la Liberté
db.companies.find(
  {}
)

// Ajouter un champ phone dans l'adresse du premier bureau des sociétés qui sont situées dans l'état de NY

// Créer une autre collection 'awards', créer quelques récompenses en les reliant à une société en utilisant une référence

// Créer une fonction qui prend en paramètre un _id et qui calcule la moyenne des likes d'une entreprise

// Ajouter quelques likes dans un tableau et tester votre fonction

