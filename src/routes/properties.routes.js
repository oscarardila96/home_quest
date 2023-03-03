const { Router } = require("express");
const { createProperty, updateProperty, deleteProperty, getAllProperties } = require("../controllers/properties.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", authMiddleware, getAllProperties)
router.post("/", authMiddleware, createProperty);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;