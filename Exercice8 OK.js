// Exercices de mises � jour

// db.collection.update(query, update, options)

// Reprendre la base paris
// use paris
// On ajoute un champ 'acces_handicape' � true aux piscines du 13�me
db.piscines.update(
    { zipCode: 75013 }, // requ�te
    { $set: { acces_handicape: true } }, // mise � jour

)
// Par d�faut update() ne modifie que le premier �l�ment qui matche

//Il faut ajouter l'option multi:true pour que la mise � jour se fasse pour tous les enregistrements
db.piscines.update(
    { zipCode: 75013 },                         // requ�te
    { $set: { acces_handicape: true } },     // mise � jour
    { multi: true }                            // options
)
// On peut aussi la m�thode updateMany() pour obtenir le m�me r�sultat
db.piscines.updateMany(
    { zipCode: 75013 },                         // requ�te
    { $set: { acces_handicape: true } },     // mise � jour
)


// L'option upsert : true ajoute un document si aucun document ne correspond ou modifie si un document correspond. C'est la contraction de update or insert
db.piscines.updateMany(
    { zipCode: 75051 },                         // requ�te
    { $set: { acces_handicape: true } },     // mise � jour
    { upsert: true }
)
db.piscines.findOne({ zipCode: 75051 })

// On peut d�finir des champs et en supprimer dans la meme requete
// Ajouter un champ verif true et supprimer l'acc�s handicap�
db.piscines.updateMany(
    { zipCode: 75013 },                                                // requ�te
    { $set: { verif: true }, $unset: { acces_handicape: "" } },     // mise � jour
)



