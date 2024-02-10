# Messaging Web Application

Welcome to the Web Messaging application. This application is built majorly using Javascript and Node.js. This is the Back end section of the README.md file.

## Setup

1. **Install Node.js:**
   - Download and install Node.js from the [official website](https://nodejs.org/).

2. **Install Visual Studio Code:**
   - Download and install Visual Studio Code from the [official website](https://code.visualstudio.com/).

3. **Install MySQL:**
   - Download and install MySQL from the [official website](https://www.mysql.com/).

4. **Install Postman:**
   - Download and install Postman from the [official website](https://www.postman.com/).

5. **Install Laragon:**
   - Download and install Laragon from the [official website](https://laragon.org/download/).
   - Laragon comes with phpMyAdmin for managing the relational database.



## Running the Backend

1. **Clone the Repository:**
   - Clone this repository to your local machine using `git clone https://github.com/martin888maina/CS-Messaging-app-Server.git`.

2. **Navigate to the Project Directory:**
   - Open the cloned repository in Visual Studio Code.

3. **Install Dependencies:**
   - Open a terminal in Visual Studio Code.
   - Run `npm install` to install all the required dependencies.

4. **Set Up Environment Variables:**
   - Create a `.env` file in the project root.
   - Define environment variables such as database credentials, JWT secret, etc.

5. **Start the Server:**
   - Run `npm start` to start the backend server.

6. **Test Endpoints with Postman:**
   - Open Postman.
   - Test the endpoints by sending requests to `http://localhost:4000`.


## Pages

1. **auth_Design.js:**
   - Validates user authentication data using Joi schema for email and password.
   - Ensures email is valid and lowercase, and password is at least 6 characters long and required.

2. **auth_Email.js:**
   - Validates user email for login authentication.
   - Requires a valid lowercase email address to access the system.
  
3. **auth_Schema.js:**
   - Validates user registration schema.
   - Requires a valid lowercase email, password, and confirmation password.

4. **generateKeys.js:**
   - Generates random keys for secure message communication.
   - Enables multiple agents to log in and respond to incoming messages.

5. **dbConfig.js:**
   - Manages database configuration settings.
   - Provides connection details for MySQL database.

6. **emailSender.js:**
   - Handles sending password reset emails to users.
   - Uses Nodemailer to send emails with a password reset link.

7. **input.csv:**
   - Contains list of messages bewteen users and messaging platform

8. **output.csv:**
   - Contains list if messages between users and messaging platform
   - This file is imported into the mysql database using the import tab

9. **preprocessCSV.js:**
   - Handles preprocessing CSV data.
   - Reads input CSV file, removes double quotes from the message_body column, and writes the processed data to an output CSV file.

10. **forgotController.js:**
   - Handles the forgot password functionality.
   - Validates the provided email, sends a password reset email, and updates the user's password.

11. **messageController.js:**
   - Performs CRUD operations on user messages.
   - Provides functionality to add, retrieve, update, and delete messages.
   
12. **registerController.js:**
   - Manages user registration, authentication, and authorization.
   - Implements user registration, login, token generation, and user role management.

13. **resetController.js:**
   - Handles password reset requests.
   - Validates the provided email, sends a password reset email with a reset link, and updates the user's password.

14. **jwtHelper.js:**
   - Provides functions for generating and verifying JWT tokens.
   - Includes methods for signing access tokens, verifying access tokens, signing refresh tokens, and verifying refresh tokens.
   - Implements middleware to verify access tokens for protected routes.
  
15. **indexStart.js:**
   - Handles database configuration and ORM (Object-Relational Mapping) setup using Sequelize.
   - Establishes connection to the database and loads Sequelize models for different sections like registration and messages.
   - Implements database synchronization to ensure tables are created if they don't exist, without dropping existing tables.

16. **MessageModel.js:**
   - Defines the Sequelize model for the "Message" table in the database.
   - Includes fields for message ID, timestamp, and message body.
   - Uses Sequelize to define the model schema and data types.

17. **registerModel.js:**
   - Defines the Sequelize model for the "register" table in the database, representing user registration data.
   - Includes fields for user ID, email, password (hashed using bcrypt), and role.
   - Implements hooks to hash passwords before storing them in the database and a method to validate passwords

18. **forgotRoutes.js:**
   - Defines routes for handling forgot password requests.
   - Exposes a POST endpoint for sending password reset emails to user's Gmail accounts.
   - Utilizes the `forgotController` to handle forgot password functionality.

19. **messageRoutes.js:**
   - Defines routes for managing messages in the system.
   - Includes endpoints for adding, retrieving, updating, and deleting messages.
   - Utilizes the `messageController` to handle message-related operations.

20. **registerRoutes.js:**
   - Defines routes for user registration, authentication, and management.
   - Provides endpoints for user registration, login, user retrieval, role update, and user deletion.
   - Uses the `registerController` to handle user-related operations.

21. **resetRoutes.js:**
   - Defines routes for handling password reset requests.
   - Exposes a POST endpoint for resetting user passwords.
   - Utilizes the `resetController` to handle password reset functionality.

22. **.env:**
   - Configuration file holding environmental variables for the application, such as database credentials and token secrets

23. **index.js:**
    - Imports the necessary modules such as Express, Socket.IO, and CORS for the server.
    - Sets up middleware for CORS.
    - Creates an HTTP server and integrates it with Socket.IO for real-time messaging functionality.
    - Imports route files for different sections of the application, such as registration, messaging, forgot password, and reset password.
    - Implements middleware for parsing JSON and URL-encoded data.
    - Defines error handling middleware for handling 404 errors and other general errors.
    - Starts the server on the specified port, either from the environment variable or a default port (4000).


## Dependencies

- **Express**: Web framework for Node.js.
- **Axios**: Promise-based HTTP client for making requests to external APIs.
- **bcrypt**: Library for hashing passwords.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **CSV Parser**: Library for parsing CSV files.
- **Dotenv**: Library for loading environment variables from a .env file.
- **Jsonwebtoken**: Library for generating and verifying JSON Web Tokens.
- **Multer**: Middleware for handling multipart/form-data.
- **MySQL2**: MySQL client for Node.js.
- **Nodemailer**: Library for sending emails.
- **Sequelize**: ORM for handling SQL databases.
- **Socket.IO**: Library for real-time bidirectional event-based communication.


### File Structure

- `index.js`: Entry point of the application.
- `routes/`: Directory containing route files for different sections of the application.
- `controllers/`: Directory containing controller files for handling business logic.
- `models/`: Directory containing database models.
- `helpers/`: Directory containing token generating files.
- `config/`: Directory containing configuration files.
- `auth/`: Directory containing vallidation and user authentication files.

### Features

- **Real-time Messaging**: Users can send and receive messages in real-time using socket.io.
- **User Registration**: Users can register accounts.
- **Forgot Password**: Functionality for resetting passwords.
- **Reset Password**: Functionality for resetting passwords.

### Environment Variables

- `PORT`: Port number for the server. Default is `4000`.

### Middleware

- `cors`: Middleware for handling Cross-Origin Resource Sharing.
- `express.json()`: Middleware for parsing JSON request bodies.
- `express.urlencoded({ extended: true })`: Middleware for parsing URL-encoded request bodies.


## API Endpoints

### Register Section

- `POST /Register/register`: Register a new user.
- `GET /Register/users`: Get all users.
- `GET /Register/userId/:id`: Get a single user by ID.
- `PATCH /Register/updateUsers/:id`: Update user role.
- `DELETE /Register/deleteUsers/:id`: Delete a user.

### Message Section

- `POST /Message/addMessage`: Save/send a message to the database.
- `GET /Message/message`: Retrieve all messages.
- `GET /Message/messageId/:id`: Retrieve a single message by ID.
- `PATCH /Message/updateMessage/:id`: Update a message.
- `DELETE /Message/deleteMessage/:id`: Delete a message.

### Login Section Functionalities

#### Forgot Password Section

- `POST /Forgot/forgot-password`: Handle forgot password requests.

#### Reset Password Section

- `POST /Reset/password-reset`: Handle password reset requests.

## Error Handling

- `404 Not Found`: If a route is not found.
- `500 Internal Server Error`: For other server errors.


## Known Issues

- Issue with implementing Forgot Password functionality using nodemailer:
  - Issue with email address not being passed in th reset link.
  - Status: Under investigation.


## License

This Messaging Application is open-sourced software licensed under the [MIT License](LICENSE).


## Acknowledgements

- I would like to acknowledge the developers and maintainers of the libraries and frameworks used in this project for their contributions.