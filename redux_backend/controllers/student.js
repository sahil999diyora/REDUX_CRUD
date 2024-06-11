var STUDENT = require('../models/student');
const Joi = require('joi');

const STUDENT_SCHEMA = Joi.object({
    surname: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required().messages({
        'string.pattern.base': 'Name must contain only alphabets',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 30 characters long',
        'any.required': 'Name is required'
    }),
    name: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(30).required().messages({
        'string.pattern.base': 'Name must contain only alphabets',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 30 characters long',
        'any.required': 'Name is required'
    }),
    age: Joi.number().required().messages({
        'number.base': 'Age must be a number',
        'any.required': 'Age is required'
    }),
    dob: Joi.date().required().messages({
        'date.base': 'Date of Birth must be a valid date',
        'any.required': 'Date of Birth is required'
    }),
    gender: Joi.string().required().messages({
        'any.required': 'Gender is required'
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
        'string.email': 'Email must be a valid email address'
    }),
    mobile: Joi.string().regex(/^\d{10}$/).required().messages({
        'string.pattern.base': 'Mobile must be a valid 10-digit number',
        'any.required': 'Mobile is required'
    })
});


exports.ADD_STUDENT = async function (req, res, next) {

    try {

        let BODY_DATA = req.body;

        let DATA = await STUDENT_SCHEMA.validateAsync(BODY_DATA);

        let SUMBMIT = await STUDENT.create(DATA);

        res.status(201).json({
            message: "DATA ADD SUCESSFULLY !",
            STUDENT_DATA: SUMBMIT
        })

    } catch (error) {
        if (error.isJoi) {
            const errorDetails = error.details.map(detail => detail.message);
            res.status(400).json({
                message: "VALIDATION ERROR",
                errors: errorDetails
            });
        } else {
            res.status(500).json({
                message: "INTERNAL SERVER ERROR",
                error: error.message
            });
        }
    }


}

exports.FETCH_STUDENTS = async function (req, res, next) {

    try {

        let STUDENT_DATA = await STUDENT.find();

        res.status(201).json({
            message: "ALL DATA FETCH SUCESSFULLY !",
            STUDENT_DATA

        })
    } catch (error) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        });
    }
}

exports.DELETE_STUDENT = async function (req, res, next) {

    try {

        let DELETE_ID = req.params.delete_id;

        let DELETE_STUDENT = await STUDENT.findByIdAndDelete(DELETE_ID);

        res.status(201).json({
            message: "STUDENT DELETED SUCESSFULLY !",
            DELETE_STUDENT

        })
    } catch (error) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        });
    }
}

exports.UPADTE_STUDENT = async function (req, res, next) {

    try {

        let UPDATE_ID = req.params.update_id;
        let EDITED_DATA = req.body;

        let DATA = await STUDENT_SCHEMA.validateAsync(EDITED_DATA);

        let UPDATE_STUDENT = await STUDENT.findByIdAndUpdate(UPDATE_ID, DATA, { new: true });

        res.status(201).json({
            message: "STUDENT UPDATED SUCESSFULLY !",
            UPDATE_STUDENT

        })
    } catch (error) {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        });
    }
}