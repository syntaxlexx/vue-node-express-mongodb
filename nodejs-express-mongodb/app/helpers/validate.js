const Validator = require('validatorjs');
const db = require("../models");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

/**
 * Checks if incoming value already exist for unique in the database
 * e.g email: required|email|unique:User,email
 * Validator.registerAsync() this will enable us to make a non-blocking call to our database and also validate other fields simultaneously:
 */
Validator.registerAsync('unique', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    // split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    // assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;
    // define custom error message
    let msg = (column == "username") ? `${column} has already been taken `: `${column} already in use`
    // check if incoming value already exists in the database
    db.mongoose.model(table).findOne({ [column]: value })
        .then((result) => {
            if(result){
                passes(false, msg); // return false if value exists
                return;
            }
            passes();
        })
});


/**
 * Checks if incoming value indeed exists in the database. Good for ensuring values supplied exist in the database
 * e.g name: required|string|exists:Gender,name
 * Validator.registerAsync() this will enable us to make a non-blocking call to our database and also validate other fields simultaneously:
 */
Validator.registerAsync('exists', function(value,  attribute, req, passes) {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    // split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    // assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;
    // define custom error message
    let msg = `${column} does not exist`
    // check if incoming value already exists in the database
    db.mongoose.model(table).findOne({ [column]: value })
        .then((result) => {
            if(! result) {
                passes(false, msg); // return false if value does not exist
                return;
            }
            passes();
        })
});

// Tighten password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
