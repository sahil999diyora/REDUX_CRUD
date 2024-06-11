var express = require('express');
var router = express.Router();
var STUDENT_CONTROLLER = require('../controllers/student');

router.post('/add', STUDENT_CONTROLLER.ADD_STUDENT);

router.get('/', STUDENT_CONTROLLER.FETCH_STUDENTS);

router.delete('/:delete_id', STUDENT_CONTROLLER.DELETE_STUDENT);

router.put('/:update_id', STUDENT_CONTROLLER.UPADTE_STUDENT);

module.exports = router;
