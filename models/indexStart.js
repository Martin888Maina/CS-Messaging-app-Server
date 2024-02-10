// Importing the dbConfig file into the indexStart.js file
const dbConfig  = require('../config/dbConfig');

// This is the ORM LEVEL. An ORM allows developers to interact with relational database.
// Sequelize allows a developer to developer to create table content without having to manually create them in the database.
const { Sequelize, DataTypes } = require('sequelize');

//At this point we are connecting to the database.
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false
    }
)

//Authenticate is a method.
//Once connection is successful it will trigger the success message.
sequelize.authenticate()
.then(()=>{
    console.log('Database Connection Successful...');
})

.catch(err =>{
    console.log('Error' + err);
});

//An object is created to hold Sequelize and sequelize instances.
const  db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


//REGISTER SECTION
// A sequelize model is loaded from the registerModel.js file and attached to the db object.
db.registers  = require('./registerModel.js')(sequelize, DataTypes)

//ADMIN SECTION
// A sequelize model is loaded from the adminModel.js file and attached to the db object.
// db.admins  = require('./adminModel.js')(sequelize, DataTypes)


//MESSAGE SECTION
// A sequelize model is loaded from the messageModel.js file and attached to the db object.
db.messages  = require('./messageModel.js')(sequelize, DataTypes)
//Implementing a foreign key that will join the student and course table in studentdb database.
//The purpose of joining tables is that I am able to extract joint information as opposed to a single information

//code from trainer//Implement the following code after setting out true.
// db.courses.hasOne(db.students)
// Use the following code when creating relationships between the contact and a listing or a report.
// db.students.belongsTo(db.courses, { foreignKey: "course_id" });

//In the case of star real estate, once user can have multiple property listings. In this case we will have a one to many relationship.

//Database synchronization level
//This means that tables will not be dropped and re-created if they already exist.
//WARNING!!!
//NEVER CHANGE THE FOLLOWING CODE FROM FALSE TO TRUE!!!
//Replace the following false into true.
//Then retry to create the foreign_id in the student table

db.sequelize.sync({force: false})
.then(()=>{
    console.log('re-sync done');
})


module.exports = db;