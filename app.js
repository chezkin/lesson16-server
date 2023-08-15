

const express = require('express');
const fs = require('fs');

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
    fs.readFile('./data.json', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/users/:id', (req, res) => {
  
    fs.readFile('./data.json', function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data).users;
        const userID = req.params.id;
        const user = users.find((user) => user.id == userID);
        res.send(user);
    });
});

app.post('/add-user', (req, res) => {
    fs.readFile('./data.json', function (err, data) {
        if (err) throw err;
        const newUser = {
            id: req.body.id,
            email: req.body.email,
            password: req.body.password,
        } ;
        const users = JSON.parse(data).users;
        users.push(newUser);
        const db = {users: users}
        fs.writeFile('./data.json', JSON.stringify(db), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            res.send('The file has been saved!');
            }); 
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});