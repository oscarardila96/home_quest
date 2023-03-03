const favorites = require("../models/favorites.models");
const properties = require("../models/properties.models");
const users = require("../models/users.models");
const pictures = require("../models/pictures.models");

class FavoritesServices {
  static async create(newFavorite) {
    try {
      const { userId, propertyId } = newFavorite;
      const user = await users.findOne({ where: { id: userId } });
      const property = await properties.findOne({ where: { id: propertyId } });
      if (user && property) {
        const result = await favorites.create(newFavorite);
        return result;
      } else {
        return user;
      }
    } catch (error) {
      throw error
    }
  }
  static async delete(id) {
    try {
      const result = await favorites.destroy({ where: { id } });
      return result;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = FavoritesServices;