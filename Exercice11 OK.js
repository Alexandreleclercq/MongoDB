// Vélib

// Récupérer un fichier json des velib chez jcdecaux developer
// Importer dans la base paris, le fichier jcdecaux.json dans une collection velib


// Cette fois-ci les données sous fournies sous la forme d'un tableau d'objets, il faut donc ajouter l'option --jsonArray pour importer
mongoimport--db paris--collection velib--file../ sampleData / jcdecaux.json--jsonArray

// Problème ! On n'a pas de champ codepostal ... On retrouve le code postal dans l'adresse.

let maRegex = /\d{5}/gi;
let myChain = "75015 Paris - 33 avenue du dessous des berges"

// Mettez à jour tous les enregistrements en leur ajoutant un champ zipCode

myChain.match(maRegex)
// Je crée un curseur qui contient toutes les stations
let toutesStations = db.velib.find();
toutesStations.forEach(oneStation => {
    maRegex = /\d{5}/gm;
    // print(oneStation.address.match(maRegex)[0]);
    oneStation.zipCode = oneStation.address.match(maRegex)[0];
    db.velib.save(oneStation);
})

// Quel est l'arrondissement de Paris ou il y a le plus de stations ? (avec un $in)      
db.velib.aggregate([
    { $match: { zipCode: { $in: ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008", "75009", "75010", "75011", "75012", "75013", "75014", "75015", "75016", "75017", "75018", "75019", "75020"] } } },
    { $group: { _id: "$zipCode", nbStations: { $sum: 1 } } },
    { $sort: { nbStations: -1 } },
    { $limit: 1 }
])

// OU plus élégant 
db.velib.aggregate([
    { $match: { zipCode: /^75/gm } },
    { $sortByCount: "$zipCode" },
    { $limit: 1 }
])

// Quelle est la ville (hors Paris) qui a le plus de stations

// OU plus élégant 
db.velib.aggregate([
    { $match: { zipCode: /^9/ } },
    { $sortByCount: "$zipCode" },
    { $limit: 1 }
])
// Cherchez la piscine Dunois .
db.piscines.find({ name: /dunois/i });
let longitude = db.piscines.find({ name: /dunois/gi }, { lon: 1, _id: 0 });
let latitude = db.piscines.find({ name: /dunois/gi }, { lat: 1, _id: 0 });

// Quelles sont les 5 stations velib les plus proches de la piscine Dunois ?


// Première version : en utilisant une fonction de calcul de distance
https://www.geodatasource.com/developers/javascript

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}


// On peut faire notre find pour trouver les 5 stations les plus proches
var testDunois = 2.366437;
var testDunoisLat = 48.832973;
var testStation = db.velib.find();

testStation.forEach(oneStation => {
    oneStation.distanceDunois = distance(oneStation.latitude, oneStation.longitude, testDunoisLat, testDunois, "K");
    print(oneStation.longitude);
    db.velib.save(oneStation);
})

db.velib.find({}, { name: 1, _id: 0, distanceDunois: 1 }).sort({ distanceDunois: 1 }).limit(5);

// Seconde version : en modifiant la structure de la collection et en utilisant l'opérateur géographique $near
// Pour utiliser $near il faut :
// - respecter l'organisation de GeoJSON (geoJson.org)
// - avoir un index de type 2dsphere
// "stationCoordinates": {
//     "type": "Point",
//         "coordinates": [longitude, latitude];
// }
db.velib.find().forEach(oneStation => {
    oneStation.stationCoordinates = {
        "type": "Point",
        "coordinates": [oneStation.longitude, oneStation.latitude]
    }
    db.velib.save(oneStation);
})


// Issu de la doc, il faut obtenir cette structure
// "coordonneesStation": {
//    "type": "Point",
//    "coordinates": [ longitude, latitude ]
//  }



// Ajout d'un index de type 2dsphere :
db.velib.createIndex({ stationCoordinates: "2dspere" });

// On peut à présent faire notre find() avec l'opérateur $near
db.velib.find({
    stationCoordinates: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [longitudeDunois, latitudeDunois],
                $maxDistance: 5000,
                $minDistance: 0,
            }
        }
    }
},
    { _id: 0, name: 1, distanceDunois: 1 }
).limit(5);
