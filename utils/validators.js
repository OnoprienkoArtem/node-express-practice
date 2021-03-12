const {body, validationResult} = require('express-validator/check');
const User = require('../models/user');

exports.registerValidators = [
    body('email').isEmail().withMessage('Type correct email').custom(async (value, {req}) => {
        try {
            const user = await User.findOne({email: value});
            if (user) {
                return Promise.reject('This email already exists');
            }
        } catch (e) {
            console.log(e);
        }
    }),
    body('password', 'Password should have min 6 symbols').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        }
        return true;
    }),
    body('name', 'Name should have min 3 symbols').isLength({min: 3}),
]
