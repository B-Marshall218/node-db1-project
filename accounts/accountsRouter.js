const express = require("express");

const server = express()
const db = require("../data/dbConfig.js");


server.use(express.json());

server.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then((accountsArray) => res.status(200).json({ data: accountsArray }))
        .catch(err => console.log(err))
})

server.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: id })
        .first()
        .then(account => res.status(200).json({ data: account }))
        .catch((err) => {
            console.log(err)
        })
})

server.post("/", (req, res) => {
    const accountData = req.body
    db("accounts")
        .insert(accountData)
        .then(id => res.json(201).json({ data: id }))
        .catch((err) => { console.log(err) })
})


module.exports = server;
