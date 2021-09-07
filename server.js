const express = require ('express');
const { static } = express;
const path = require('path');

const app = express();
app.use(express.json());

app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/guitars', async(req, res, next) => {
  try{
    res.send(await Guitar.findAll());
  }
  catch(error){
    next(error)
  }
});

app.get('/api/guitars/:id', async(req, res, next) => {
  try{
    const guitar = await Guitar.findByPk(req.params.id);
    res.send(guitar)
  }
  catch(error){
    next(error)
  }
});

app.get('/api/wallet', async(req, res, next) => {
  try{
    const wallet = await Wallet.findAll();
    res.send(wallet)
  }
  catch(error){
    next(error)
  }
});

app.put('/api/wallet', async(req, res, next) => {
  try{
    const wallet = await Wallet.findAll();
    await wallet.update(req.body)
    res.send(wallet)
  }
  catch(error){
    next(error)
  }
});

app.put('/api/guitars/:id', async(req, res, next) => {
  try {
    const guitar = await Guitar.findByPk(req.params.id);
    await guitar.update(req.body);
    res.send(guitar);
  }
  catch(error) {
    next(error)
  }
});

app.post('/api/guitars', async(req, res, next) => {
  try{
    res.send(await Guitar.create(req.body));
  }
  catch(error){
    next(error)
  }
});

app.post('/api/guitars/random', async(req, res, next) => {
  try{
    res.send(await Guitar.createRandom());
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
const { DECIMAL } = require('sequelize');

const Guitar = conn.define('guitar', {
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

const Wallet = conn.define('wallet', {
  cash: {
    type: DECIMAL
  }
})

Guitar.createRandom = function(){
  return Guitar.create({ name: faker.commerce.productName() });
}

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Guitar.create({ name: 'Fender Strat', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/1958_Fender_Stratocaster.jpg/377px-1958_Fender_Stratocaster.jpg' }),
    Guitar.create({ name: 'Gibson Les Paul', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Full_front_R9_Les_Paul.jpg/220px-Full_front_R9_Les_Paul.jpg' }),
    Guitar.create({ name: 'PRS Custom 24', imageURL: 'https://images.reverb.com/image/upload/s--P3EKRm1p--/f_auto,t_supersize/v1571952526/ftainpt4zthtueka47bu.jpg',purchased: true }),
    Wallet.create({ cash: 1000 })
  ]);
};

init();