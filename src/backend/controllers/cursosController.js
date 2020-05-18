const express = require('../../../node_modules/express')
const modelo = require('../../../models')
const Estudiante = modelo.Estudiantes
const Curso = modelo.Cursos
const Lista = modelo.CursosEstudiantes
// const Lista = modelo.Lista;
const app = express()
app.use(express.json())

// Función para crear un nuevo curso en la base de datos
exports.create = function (req, res) {
  const curso = req.body// guardamos el request body
  Curso.create({ // Ejecutamos el query
    clave: curso.clave,
    nombre: curso.nombre,
    creditos: curso.creditos,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(() => { // En caso que se complete la ejecución
      res.status(201).send('La petición ha sido completada')
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}
// Función para obtener todos los cursos registrados en la base de datos
exports.findAll = function (req, res) {
  Curso.findAll()// Ejecutamos el query
    .then(cursos => { // En caso que se complete la ejecución
      res.status(200).send(JSON.stringify(cursos, null, 4))
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(404).send('recurso no encontrado')
    })
    .finally(() => {
      res.end()
    })
}

// Función para eliminar todos los cursos registrados
exports.deleteAll = function (req, res) {
  Curso.destroy()// Ejecutamos el query
    .then(() => { // En caso que se complete la ejecución
      res.status(200).send('Operación realizada con éxito')
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}

exports.deleteByClave = function (req, res) {
  Curso.destroy({
    where: { clave: req.params.id }
  })// Ejecutamos el query
    .then(() => { // En caso que se complete la ejecución
      res.status(200).send('Operación realizada con éxito')
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}

// Función para obtener un curso en base a su clave
exports.findByClave = function (req, res) {
  Curso.findOne({ // Ejecutamos el query
    where: { clave: req.params.id }// clave del curso a buscar
  })
    .then(dato => { // En caso que se complete la acción
      res.status(200).send(JSON.stringify(dato, null, 4))
    })
    .catch(() => { // En caso que no se complete la acción
      res.status(404).send('recurso no encontrado')
    })
    .finally(() => {
      res.end()
    })
}
// Función para actualizar un curso en base a su clave
exports.update = function (req, res) {
  const curso = req.body
  Curso.update({ // Ejecutamos el query
    // Indicamos que atributos cambiar
    nombre: curso.nombre,
    creditos: curso.creditos
  }, { where: { clave: req.params.id } })// indicamos que curso cambiar
    .then(() => {
      res.status(201).send('La petición ha sido completada')
    })
    .catch(() => {
      res.status(404).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}

exports.inscribir = function (req, res) {
  Lista.create({
    clave_curso: req.params.idcurso,
    matricula_estudiante: req.params.id,
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then(() => { // En caso que se complete la ejecución
      res.status(201).send('La petición ha sido completada')
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}

exports.deleteEstudianteLista = function (req, res) {
  Lista.destroy({
    where: { clave_curso: req.params.idcurso, matricula_estudiante: req.params.id }
  })// Ejecutamos el query
    .then(() => { // En caso que se complete la ejecución
      res.status(200).send('Operación realizada con éxito')
    })
    .catch(() => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}

exports.getLista = function (req, res) {
  const estudiante = []
  const aux = {}
  Lista.findAll({
    where: { clave_curso: req.params.id },
    attributes: ['clave_curso', 'matricula_estudiante']
  })
    .then(matriculas => {
      res.status(200).send(matriculas)
    })
    .catch(error => { // En caso que no se complete la ejecución
      res.status(400).send('Petición no generada')
    })
    .finally(() => {
      res.end()
    })
}
