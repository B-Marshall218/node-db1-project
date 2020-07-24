const express = require("express")

const db = require("../data/dbConfig.js")


const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({ api: "working" })
})

server.get("/accounts", (req, res) => {
    db.select("*")
        .from("accounts")
        .then((accountsArray) => res.status(200).json({ data: accountsArray }))
        .catch(err => console.log(err))
})

server.get("/accounts/:id", (req, res) => {
    const { id } = req.params;
    db("accounts")
        .where({ id: id })
        .first()
        .then(account => res.status(200).json({ data: account }))
        .catch((err) => {
            console.log(err)
        })
})

server.post("/accounts", (req, res) => {
    const accountData = req.body
    db("accounts")
        .insert(accountData)
        .then(id => res.json(201).json({ data: id }))
        .catch((err) => { console.log(err) })
})

server.put("/accounts/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db("accounts")
        .where("id", id)
        .update(changes)
        .then((account) => {
            if (account > 0) {
                res.status(200).json({ data: account })
            } else {
                res.status(404).json({ message: "there was no record to update" })
            }
        })
        .catch((err) => { console.log(err) })
})

server.delete("/accounts/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .where("id", id)
        .del()
        .then((account) => {
            if (account > 0) {
                res.status(200).json({ data: account })
            } else {
                res.status(404).json({ message: "there was no record to delete" })
            }
        }).catch((err) => { console.log(err) })
})



module.exports = server;
