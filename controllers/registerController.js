// Keep this code
//Importing the indexStart file into the studentController.js file.
const db = require('../models/indexStart');

//Importing the global error handling package into the studentController file.
const createError     = require('http-errors');

//Importing the Register Models file into the registerController.js file
const Register        = db.registers;

//importing the email & password validation npm package FOR REGISTER PROCESS
const { authSchema }  = require('../auth/auth_Schema'); 

//importing the email & password validation npm package FOR LOGIN PROCESS
const { authDesign }  = require('../auth/auth_Design'); 


// importing the JWT package due to accessToken used in code
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwtHelper'); 

module.exports={

    // Register code
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await authSchema.validateAsync(req.body);
            const Exists = await Register.findOne({ where: { email: result.email } });
            if (Exists) throw createError.Conflict(`${email} has already been registered`);

            // Assuming defaultRole is defined elsewhere
            const defaultRole = "user";
            const register = new Register({ ...result, role: defaultRole });
            const savedRegister = await register.save();

            const accessToken = await signAccessToken(savedRegister.id);
            const refreshToken = await signRefreshToken(savedRegister.id);

            res.status(201).send({ accessToken, refreshToken });

        } catch (error) {
            next(error);
        }
    },

    // Get all users
    getAllUsers: async (req, res, next) => {
        try {
            const users = await Register.findAll();
            res.send(users);
        } catch (error) {
            next(error);
        }
    },

    // Get a single user by ID
    getOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await Register.findByPk(id);
            if (!user) throw createError.NotFound('User not found');
            res.send(user);
        } catch (error) {
            next(error);
        }
    },

    // Update user role
    updateUserRole: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { role } = req.body;
            console.log(req.body);

            await Register.update({ role }, { where: { id } });

            res.send({ message: 'User role updated successfully' });
        } catch (error) {
            next(error);
        }
    },

    // Delete user
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            await Register.destroy({ where: { id } });

            res.send({ message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    },

    // Login code
    // Login code
    login: async (req, res, next) => {
        try {
            const result = await authDesign.validateAsync(req.body);
            const register = await Register.findOne({ where: { email: result.email } });
            if (!register) throw createError.NotFound('User is not registered');
            
            // Create an instance of the Register model
            const user = new Register(register.dataValues);

            // Matching the password using the isValidPassword method
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createError.Unauthorized('Username/Password is not valid');

            // If password matches, get the user's role
            const role = register.role;

            // Generate access and refresh tokens
            const accessToken = await signAccessToken(register.id);
            const refreshToken = await signRefreshToken(register.id);

            res.send({ accessToken, refreshToken, role });
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest('Invalid username/password'));
            next(error);
        }
    },


    // RefreshToken code
    refreshToken: async (req, res, next)=>{
        try{
            const { refreshToken }     = req.body;
            if(!refreshToken) throw createError.BadRequest();
            const registerId           = await verifyRefreshToken(refreshToken);

            const accessToken          = await signAccessToken(registerId);
            const refToken             = await signRefreshToken(registerId);

            res.send({ accessToken:accessToken, refreshToken:refToken });

        }catch(error){
            next(error);
        }
    }
    
}















    












