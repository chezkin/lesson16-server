// import file from './data.json';
// import fs from 'fs';

export function readAllUsers() {
     fs.readFile('./data.json', function(err, data) {
        if (err) throw err;
        res.send(data);
    });
}