'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      character.belongsToMany(models.movie, {
        through: "character_movies",
     });
    }
  }
  character.init({
    name: DataTypes.STRING,
    img_link: DataTypes.STRING,
    age: DataTypes.INTEGER,
    history: DataTypes.TEXT,
    weight: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};