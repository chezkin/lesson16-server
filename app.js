
import { emailval, passwordval } from './func.js';
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jsonfile from 'jsonfile';
// const EmailValidation = require('emailvalid')
const saltRounds = 10;
// const ev = new EmailValidation()

const app = express();
const port = 3000;

app.use(express.json());

function requireLOG(req, res, next) {
    console.log(`${req.method} url:${req.url} at:${new Date()}`)
    next();
}
app.use(requireLOG);

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/users', (req, res) => {
    jsonfile.readFile('./data.json', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/users/:id', (req, res) => {

    jsonfile.readFile('./data.json', function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data);
        users.forEach(user => {
            if (user.id.slice(0, 3) == req.params.id) {
                res.send(user);
            }
        });

    });
});

app.post('/add-user', (req, res) => {
    jsonfile.readFile('./data.json', function (err, users) {
        if (err) throw err;
        const uuid = uuidv4();
        if (! passwordval(req.body.password)) {
            res.send('invalid password');
            return;
        };
        const myPlaintextPassword = req.body.password;
        const myHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
        if (! emailval(req.body.email)) {
            res.send('invalid email')
            return;
        };
        const newUser = {
            id: uuid,
            email: req.body.email,
            password: myHash,
        };
        users.push(newUser);
        jsonfile.writeFile('./data.json', users, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.send('The file has been saved!');
        });
    });
});

app.put('/edit-user/:id', (req, res) => {
    jsonfile.readFile('./data.json', function (err, users) {
        if (err) throw err;

        const userID = users[req.params.id];
        if (req.body.email) { userID.email = req.body.email }
        if (req.body.password) { userID.password = req.body.password }
        jsonfile.writeFile('./data.json', users, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.send('The file has been saved!');
        });
    });
});

app.delete('/delete-user', (req, res) => {
    jsonfile.readFile('./data.json', function (err, users) {
        if (err) throw err;
        const newUsers = users.filter(user => user.id != req.body.id);
        jsonfile.writeFile('./data.json', newUsers, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.send('The file has been saved!');
        });
    });
});

app.post('/if-user', (req, res) => {
    jsonfile.readFile('./data.json', function (err, users) {
        if (err) throw err;
        users.forEach(user => {
            if (user.email == req.body.email) {

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send("User is connected");
                }
            }
        });
        res.send("wrong credentials")
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});