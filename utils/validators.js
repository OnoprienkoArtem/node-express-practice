const {body, validationResult} = require('express-validator/check');
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Type correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject('This email already exists');
                }
            } catch (e) {
                console.log(e);
            }
        })
        .normalizeEmail(),
    body('password', 'Password should have min 6 symbols')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        })
        .trim(),
    body('name', 'Name should have min 3 symbols').isLength({min: 3})
        .trim(),
]

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Minimum name of length 3 characters').trim(),
    body('price').isNumeric().withMessage('Enter the correct price'),
    body('img', 'enter the correct URL').isURL(),
]