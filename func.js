
import validator from "email-validator"



import passwordValidator from 'password-validator';
const schema = new passwordValidator();
schema
.is().min(6)                                    // Minimum length 8
.is().max(10)                                  // Maximum length 100
// .has().uppercase()                              // Must have uppercase letters
// .has().lowercase()                              // Must have lowercase letters
// .has().digits(2)                                // Must have at least 2 digits
// .has().not().spaces()                           // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


function readAllUsers() {
     fs.readFile('./data.json', function(err, data) {
        if (err) throw err;
        res.send(data);
    });
}


export function emailval(email) {
   return validator.validate(email) ? true : false;
}

export function passwordval(password) {
    return schema.validate(password) ? true : false;
 }