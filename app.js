

const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(console.log(`${req.method} url:${req.url} at:${new Date().getTime()}`));

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
    fs.appendFile('./data.json', function (err, data) {
        if (err) throw err;
        const users = JSON.parse(data).users;
        const userID = req.params.id;
        const user = users.find((user) => user.id == userID);
        console.log(user);
        res.send(user);
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});