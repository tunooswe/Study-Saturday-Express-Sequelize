const router = require("express").Router();
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (student) res.send(student);
    else res.status(404).send("Student not found");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Student.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.send(updated[1]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
