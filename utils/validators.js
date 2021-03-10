const {body, validationResult} = require('express-validator/check');

exports.registerValidators = [
    body('email').isEmail().withMessage('Type correct email'),
    body('password', 'Password should have min 6 symbols').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        }
        return true;
    }),
    body('name', 'Name should have min 3 symbols').isLength({min: 3}),
]
