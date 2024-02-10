//We are now implementing a feature that allows us to generate and store a password token
//KEEP THIS CODE
const bcrypt = require('bcrypt');

module.exports = (Sequelize, DataTypes) => {
  const Register = Sequelize.define('register', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user' // Set default value to 'user'
    },
  });

  Register.beforeCreate(async (user, options) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(user.password, salt);
      user.password = hashedPwd;
    } catch (error) {
      console.error('Error encrypting password:', error);
      throw new Error('Error Encrypting Password');
    }
  });

  Register.prototype.isValidPassword = async function (password) {
    if (!this.password) {
      return false;
    }
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  };

  return Register;
};

