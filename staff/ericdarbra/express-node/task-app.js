const express = require('express')
const bodyParser = require('body-parser')

const port = process.argv[2]

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // middleware

const tasks = []

app.get('/', (req, res) => {
    res.send(`<html>
        <head>
            <title>Task App</title>
        </head>
        <body>
            <form action="/add-task" method="POST">
                <textarea name="task" placeholder="write a task"></textarea>
                <button type="submit">Add</button>
            </form>
        </body>
    </html>`)
})

app.post('/add-task', (req, res) => {
    const { body: { task } } = req

    tasks.push(task)

    res.send(`<html>
        <head>
            <title>Task App</title>
        </head>
        <body>
            <form action="/add-task" method="POST">
                <textarea name="task" placeholder="write a task"></textarea>
                <button type="submit">Add</button>
            </form>
            <h2>Todo</h2>
            <ul>
                ${tasks.map(task => `<li>${task}</li><button type="submit">V</button>`)}
            </ul>
        </body>
    </html>`)
})

app.post('/done-task', (req, res) => {
    const { body: { task, done } } = req

    dones.push(done)

    res.send(`<html>
        <head>
            <title>Task App</title>
        </head>
        <body>
            <form action="/add-task" method="POST">
                <textarea name="task" placeholder="write a task"></textarea>
                <button type="submit">Add</button>
            </form>
            <h2>DONE</h2>
            <ul>
                ${tasks.map(done => `<li>${done}</li><button type="submit">X</button>`)}
            </ul>
        </body>
    </html>`)
})

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})