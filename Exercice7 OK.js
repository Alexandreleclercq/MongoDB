// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il y l'executable mongoimport


// Combien y a-t-il de restaurants ?
db.restaurants.count();
// Identique à


// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find()

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({ "address.street": { $in: [/morris park ave/gi] } });

// L'utilisation d'une regex permet de récupérer les 2 orthographes (et éventuellement les orthographes alternatives en minuscules avec le flag i(nsensitive) )

// Combien y en-a-t-il ?
db.restaurants.find({ "address.street": { $in: [/morris park ave/gi] } }).count();

36

// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse
db.restaurants.find({ "address.street": { $in: [/morris park ave/gi] } }, { cuisine: 1, address: 1, borough: 1, _id: 0 });

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or
db.restaurants.find({ $and: [{ borough: /staten island/gi }, { $or: [{ cuisine: /hamburgers/gi }, { cuisine: /bakery/gi }] }] });
// Avec le $and implicite
db.restaurants.find({ borough: /staten island/gi }, { $or: [{ cuisine: /hamburgers/gi }, { cuisine: /bakery/gi }] }, { name: 1, _id: 0 })
// Avec un $in
db.restaurants.find({ borough: /staten island/i, cuisine: { $in: [/hamburger/i, /bakery/i] } })

// La variable restaurants est un objet. Dans mongo, ils appellent cela un curseur...
let plop = db.restaurants.find().limit(50);

// Parcours d'un curseur avec un while
while (restos.hasNext()) {
  printjson(restos.next())
}

// Parcours d'un curseur avec un foreach
test.forEach(restaurant => { print(restaurant.name) });

// Quel est le type de restaurant le plus présent ?
// Vous pouvez le faire en vanillaJS
var blablatest = db.restaurants.find();
var cuicui = [];
blablatest.forEach(resto => {
  if (cuicui.indexOf(resto.cuisine) === -1) {
    cuicui.push(resto.cuisine);
  }
})

var nombreRestos = 0;
var nomResto = "";
cuicui.forEach(oneCuisine => {
  // print(oneCuisine);
  // print(db.restaurants.count({ cuisine: oneCuisine }));
  if (db.restaurants.count({ cuisine: oneCuisine }) > nombreRestos) {
    nombreRestos = db.restaurants.count({ cuisine: oneCuisine });
    nomResto = oneCuisine;
  }
})

// Autre méthode. Plus élégante ??
// C'est le pipeline d'aggregation


// Pour limiter aux restos de Staten Island

db.restaurants.aggregate(
  [
    { $match: { borough: /staten island/gi } },
    { $group: { _id: "$cuisine", nbRestosParCuisine: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $limit: 10 }
  ]
)