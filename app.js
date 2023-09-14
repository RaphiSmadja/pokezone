const express = require('express')
const app = express()
const cors = require("cors")
const path = require('path')
const port = 3000
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'pokemon',
  'root',
  'admin',
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("users", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  release_date: {
    type: Sequelize.DataTypes.DATEONLY,
  },
});

sequelize.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});
var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))


// parse requests of content-type - application/json
app.use(express.json());

app.get('/login',(req,res) => {
  console.log("hello")
})

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
