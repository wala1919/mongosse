const mongoose =  (require('mongoose'));  
require('dotenv').config();  

mongoose.connect(process.env.MONGO_URI, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
})  
.then(() => console.log('Connexion à MongoDB réussie'))  
.catch(err => console.error('Échec de la connexion à MongoDB', err));  


const personSchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    age: { type: Number },  
    favoriteFoods: { type: [String], default: [] },  
});  

const Person = mongoose.model('Person', personSchema);  

  
const createPerson = async () => {  
    const person = new Person({  
        name: 'Alice',  
        age: 30,  
        favoriteFoods: ['Pizza', 'Sushi'],  
    });  

    person.save((err, data) => {  
        if (err) return console.error(err);  
        console.log('Personne créée:', data);  
    });  
};  

  
const createManyPeople = async (arrayOfPeople) => {  
    await Person.create(arrayOfPeople, (err, data) => {  
        if (err) return console.error(err);  
        console.log('Personnes créées:', data);  
    });  
};  

  
createManyPeople([  
    { name: 'walaa', age: 25, favoriteFoods: ['Burritos', 'Tacos'] },  
    { name: 'aminee', age: 22, favoriteFoods: ['Salad', 'Pasta'] },  
]);  

  
const findPeopleByName = async (name) => {  
    const people = await Person.find({ name });  
    console.log('Personnes trouvées:', people);  
};  

  
const findPersonByFavoriteFood = async (food) => {  
    const person = await Person.findOne({ favoriteFoods: food });  
    console.log('Personne trouvée avec aliment préféré:', person);  
};  

  
const findPersonById = async (personId) => {  
    const person = await Person.findById(personId);  
    console.log('Personne trouvée par ID:', person);  
};  
  
const updatePersonFavoriteFood = async (personId) => {  
    const person = await Person.findById(personId);  
    person.favoriteFoods.push('Hamburger');  
    person.markModified('favoriteFoods');   
    await person.save((err, updatedPerson) => {  
        if (err) return console.error(err);  
        console.log('Personne mise à jour:', updatedPerson);  
    });  
};  

  
const updatePersonAgeByName = async (personName) => {  
    const updatedPerson = await Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true });  
    console.log('Personne mise à jour par nom:', updatedPerson);  
};  

  
const removePersonById = async (personId) => {  
    await Person.findByIdAndRemove(personId, (err, removedPerson) => {  
        if (err) return console.error(err);  
        console.log('Personne supprimée:', removedPerson);  
    });  
};  

  
const removePeopleByName = async (name) => {  
    await Person.remove({ name }, (err, result) => {  
        if (err) return console.error(err);  
        console.log('Personnes supprimées:', result);  
    });  
}; 
const findPeopleWhoLikeBurritos = async () => {  
    await Person.find({ favoriteFoods: 'Burritos' })  
        .sort({ name: 1 })  
        .limit(2)  
        .select('-age')  
        .exec((err, data) => {  
            if (err) return console.error(err);  
            console.log('Personnes qui aiment les burritos:', data);  
        });  
};  
 
createPerson(); 
findPeopleByName('Alice'); 


const PORT = 5000
app.listen(PORT,()=>console.log("my server is running",PORT))
