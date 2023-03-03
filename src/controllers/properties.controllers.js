const PropertiesServices = require("../services/properties.services");
const PicturesServices = require("../services/pictures.services");

const getAllProperties = async (req, res, next) => {
  try {
    const result = await PropertiesServices.getAll()
    if (result) {
      res.json(result)
    } else {
      next({ message: "Algo salió mal" });
    }
  } catch (error) {
    next(error)
  }
};

const createProperty = async (req, res, next) => {
  try {
    const newProperty = req.body;
    const { pictures } = req.body;
    const result = await PropertiesServices.create(newProperty);
    const { id: propertyId } = result;
    if (pictures) {
      const picturesArray = pictures.map(pictureUrl => {
        return { pictureUrl, propertyId }
      });
      await PicturesServices.addPictures(picturesArray);
    }
    if (result) {
      res.status(201).json({ message: "Propiedad creada exitosamente" });
    } else {
      next({ message: "Algo salió mal" });
    }
  } catch (error) {
    next(error);
  }
};

const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await PropertiesServices.update(id, field);
    if (result) {
      res.json({ message: "Propiedad actualizada exitosamente" });
    } else {
      next({ message: "Algo salió mal" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PropertiesServices.delete(id);
    if (result) {
      res.json({ message: "Propiedad eliminada exitosamente" });
    } else {
      next({ message: "Algo salió mal" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createProperty, updateProperty, deleteProperty, getAllProperties };