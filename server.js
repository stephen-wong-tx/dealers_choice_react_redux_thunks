const express = require ('express');
const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());

app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/groceries', async(req, res, next) => {
  try{
    res.send(await Grocery.findAll());
  }
  catch(error){
    next(error)
  }
});

app.get('/api/groceries/:id', async(req, res, next) => {
  try{
    const grocery = await Grocery.findByPk(req.params.id);
    res.send(grocery)
  }
  catch(error){
    next(error)
  }
});

app.put('/api/groceries/:id', async(req, res, next) => {
  try {
    const grocery = await Grocery.findByPk(req.params.id);
    await grocery.update(req.body);
    res.send(grocery);
  }
  catch(error) {
    next(error)
  }
});

app.post('/api/groceries', async(req, res, next) => {
  try{
    res.send(await Grocery.create(req.body));
  }
  catch(error){
    next(error)
  }
});

app.post('/api/groceries/random', async(req, res, next) => {
  try{
    res.send(await Grocery.createRandom());
  }
  catch(error){
    next(error)
  }
});

const init = async()=> {
  try{
    await syncAndSeed();
    const port = process.env.PORT || 1337;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(error){
    console.log(error)
  }
};

const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/test_groceries_db');
const faker = require('faker');

const Grocery = conn.define('grocery', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchased: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imageURL: {
    type: STRING,
    allowNull: false,
    defaultValue: 'https://thumb7.shutterstock.com/image-photo/stock-vector-guitar-450w-5599069.jpg'
  }

});

Grocery.createRandom = function(){
  return Grocery.create({ name: faker.commerce.productName() });
}

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Grocery.create({ name: 'Fender Strat' }),
    Grocery.create({ name: 'Gibson Les Paul' }),
    Grocery.create({ name: 'PRS Custom 24', purchased: true })
  ]);
};

init();