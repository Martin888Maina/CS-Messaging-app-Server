//This file contains information on the database, The code to connect to the database.
//The information in this file should correspond to the information in the .env file.

module.exports={
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB:process.env.DATABASE,
    dialect: 'mysql' //this references the type of database we will be using. In our case mysql database.
}