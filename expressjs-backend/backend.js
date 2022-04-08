const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
  
app.use(cors()); 
app.use(express.json());
 
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined && job != undefined){
        let result = findUserByJobandName(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJobandName = (name, job) => {
    return users['users_list'].filter( (user) => (user['job'] === job && user['name'] === name));
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.delete('/users/:id', (req,res) => {
    const id = req.params.id;
    let result = findUserById(id);
    // once we find the id, remove the stuff?
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(result);
        res.status(204).end();
    }
});

function deleteUser(user){
    users['users_list'].splice(users['users_list'].indexOf(user), 1);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});


function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}


function addUser(user){
    user['id'] = uniqueID();
    users['users_list'].push(user);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      