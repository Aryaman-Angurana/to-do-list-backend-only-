const express = require('express');
const app = express();
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

require('dotenv').config()


const mongoose = require('mongoose')
mongoose.connect(process.env.Database_url);
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))



const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')



app.use('/login', loginRouter)
app.use('/users', usersRouter)


// app.get('/favicon.ico', (req, res) => {
//     res.status(204).end();
// });


app.get("/", (req, res) => {
    res.redirect('/login/login-screen')
})


app.listen(3000);

