const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().min(4).required()
    .pattern(new RegExp('^[^@]+@[^@]+\\.[^@]+$'))
    .messages({
        'string.pattern.base': 'Please provide a valid email address',
        'any.required': 'Email is required',
        'string.min': 'Email must be at least 4 characters long'
    }),
    password: Joi.string().min(8).required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }),

})

module.exports = userSchema