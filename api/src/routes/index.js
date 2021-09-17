const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dog', async (req, res) => {
    console.log("ruta", req.query.id)
        const dog = await Dog.findByPk(
            req.query.id
        );
console.log(dog, "dog")
res.send( dog)
})

router.get('/dogs', async (req, res) => {

    const apiDogs = async() => {
        const info = await axios.get('https://api.thedogapi.com/v1/breeds');
        const dogsInfo = info.data;
        const apiBreeds = await dogsInfo.map( d => {
            return {
            name: d.name,
            weight: d.weight.metric,
            temperament: d.temperament,
            image: d.image.url,
            id: d.id
            }
        });
        return apiBreeds;
        }
    
    const dbDogs = async() => {
        return await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
    };
    
    const allBreeds = async() => {
        const getApiDogs = await apiDogs();
        const getDbDogs = await dbDogs();
        const allDogs = getApiDogs.concat(getDbDogs);
        return allDogs;
    };

const dogs = await allBreeds();
const {name} = req.query;

if (name) {
    const byName = dogs.filter( d => d.name.toLowerCase().includes(name.toLowerCase()));
    byName.length? res.send(byName) : res.status(400).send("No dog breed with that name 😕");
} else {
res.status(200).send(dogs);
   }
});


router.get('/dogs/:idRaza', async (req, res) => {
const info = await axios.get('https://api.thedogapi.com/v1/breeds');
const {idRaza} = req.params;
const dogsInfo = info.data;
const dog = await dogsInfo.filter ( d => d.id == idRaza) 
const dogInfo = dog.map( d => {
    return {
    name: d.name,
    weight: d.weight.metric,
    height: d.height.metric,
    temperament: d.temperament,
    life_Expectancy: d.life_span,
    image: d.image.url,
    id: d.id
    }
})
dog? res.status(200).send(dogInfo) : res.status(400).send("No dog matches that id ❌"); 
})

router.get('/temperaments', async (req, res) => {
const {data} = await axios.get('https://api.thedogapi.com/v1/breeds');
const rawTemperaments = data.map(d => d.temperament);
const temperamentsString = rawTemperaments.toString();
const arrayTemperaments = temperamentsString.split(",");
const temperamentS = arrayTemperaments.flat();
const temperaments = temperamentS.map(t => t.trim());

temperaments.forEach(t => {
    Temperament.findOrCreate({
        where: {
            name: t
        }
    })
})

const allTemperaments = await Temperament.findAll();
return res.status(200).send(allTemperaments);
})

router.post('/dogs', async (req, res) => {
console.log("aaaaaaaAAAAAAA")
let { name, height, weight,  lifespan, temperament, createdInDb, image  } = req.body

let createdDog =  await Dog.findOrCreate ({
    where: { name }, 
    defaults: { height, weight, lifespan, temperament, createdInDb, image}
});

temperaments.map(temp=> {
    const findTemp = Temperament.findOne({
        where: { name: temp.name}
    })
    createdDog.addTemperament(findTemp);
})


return res.send("Dog breed added succesfully ✔");

})
module.exports = router;
