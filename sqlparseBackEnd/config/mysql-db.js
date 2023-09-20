const Sequelize = require("sequelize")

var db = {};
console
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    'host': process.env.MYSQL_HOST, 
    'port': process.env.MYSQL_PORT,
    'dialect': process.env.MYSQL_DIALECT, 
    'define': {
        freezeTableName: true,
    },

    pool: {
        max: 10,
        min: 0,
        acquire: 6000,          
        idle: 10000,           
    },
    operatorAliases: false      
});

const models = [
    require('../models/Parser')
]

models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel;                   
})
db.sequelize = sequelize;
module.exports = db