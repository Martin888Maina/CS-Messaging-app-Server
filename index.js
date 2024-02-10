//Importing express into our index file
const express = require('express');

// Importing the socket.io integration into the messaging application
const http = require('http');

const socketIo = require('socket.io');

//Importing CORS into our index file
const cors    = require('cors');

//Importing .ENV into out index file
require ('dotenv').config();

//This is the first level of connection
//Middleware code is written below this line of code.
const app = express();


//This the port for the front-end section of our code.
var corsOptions = {
  origin: 'http://localhost:3000',
}

//Middleware code
app.use(cors(corsOptions));

// Importing the socket.io connections
const server = http.createServer(app);

const io = socketIo(server);

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages
  socket.on('message', (message) => {
    console.log('Message received:', message);

    // Broadcast the message to all connected sockets
    io.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


//REGISTER SECTION
//Importing the registerRoutes.js file
const registerRoute = require('./routes/registerRoutes');

//ADMIN SECTION
//Importing the adminRoutes.js file
// const adminRoute = require('./routes/adminRoutes');


//MESSAGE SECTION
//Importing the messageRoutes.js file
const messageRoute = require('./routes/messageRoutes');


//LOGIN SECTION FUNCTIONALITIES
//FORGOT PASSWORD SECTION
//Importing the forgotRoutes.js file
const forgotRoute = require('./routes/forgotRoutes');

//RESET PASSWORD SECTION
//Importing the resetRoutes.js file
const resetRoute = require('./routes/resetRoutes');


//Middleware code
app.use(express.json());

//REGISTER SECTION
// app.use(routes);//register
app.use('/Register', registerRoute);

// //ADMIN SECTION
// // app.use(routes);//admin
// app.use('/Admin', adminRoute);

//MESSAGE SECTION
// app.use(routes);//message
app.use('/Message', messageRoute);


// LOGIN SECTION FUNCTIONALITY MIDDLEWARE SECTION
//FORGOT PASSWORD SECTION
// app.use(routes);//forgot
app.use('/Forgot', forgotRoute);

//RESET PASSWORD SECTION
// app.use(routes);//reset
app.use('/Reset', resetRoute);


//Middleware code
app.use(express.urlencoded({extended: true}));

//Handling 404 error
app.use((req, res, next)=>{
  const err  = new Error("Not Found");
  err.status = 404;
  next(err);
})

//Error Handler (Global)
// This code will handle all other forms of errors apart from the 404 that is defined above.
//To be confirmed by trainer (added res)
app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.send({
    error:{
      status: err.status || 500,
      message: err.message
    }
  });
});


//This is server code, an introduction to the line of code below.
const PORT = process.env.PORT || 4000

//Creating the server at this point.
app.listen(PORT, ()=>{
  console.log(`Server is running on Port: ${PORT}`);
});