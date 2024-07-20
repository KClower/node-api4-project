const express = require('express');

const server = express();

server.use(express.json());

const Users = [
    {
        id: 1,
        name: "Oscar",
    },
    {
        id: 2,
        name: "Kevin",
    },
    {
        id: 3,
        name: "Randi",
    },
    {
        id: 4,
        name: "Matt",
    },
]

server.get('/', (req, res) => {
    const message = process.env.MESSAGE;
    res.status(200).json({ message });
});

server.get('/users', (req, res) => {
    return res.status(200).json(Users);
});

server.post('/users', (req, res) => {
    const newUser = req.body;
    if (!newUser.name) {
        return res.status(400).json({ message: "Please provide name." });
    }
    const nextId = Users.length > 0 ? Math.max(...Users.map(User => User.id)) + 1 : 1;
    newUser.id = nextId;
    Users.push(newUser);
    return res.status(201).json({ message: "User has been added", newUser });
});

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    const deleted = Users.find(u => u.id === id);
    users = Users.filter(u => u.id !== id);

    return res.status(200).json({ message: "Deleted", deleted });
});




module.exports = server;