const express = require("express");
const router = express.Router();

const Libro = require("../models/Libro");

const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Para obtener todos los libros
router.get("/", requiredScopes("read:libros"), async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
});

// Para crear un nuevo libro
router.post("/", requiredScopes("write:libros"), async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el librp" });
  }
});

// Para actualizar un libro

router.put("/:id", requiredScopes("write:libros"), async (req, res) => {
  try {
    const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(Libro);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Libro" });
  }
});

// Para eliminar un Libro
router.delete("/:id", requiredScopes("write:libros"), async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Libro" });
  }
});

module.exports = router;
