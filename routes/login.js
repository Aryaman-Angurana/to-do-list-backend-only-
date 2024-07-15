const express = require('express')

const router = express.Router()
const userSchema = require('../models/users')


router.get('/login-screen', (req, res) => {
    res.render("login/login-screen");
})

router.get('/add-user', (req, res) => {
    res.render("login/add-user")
})
    
router.get("/", (req, res) => {
    res.redirect("login/login-screen")
})

router.get("/:id", (req, res) => {
    res.status(404).render("not_found")
})

router.post('/login-screen', async (req, res) => {
    try{
        if (req.body.username === ''){
            res.render("login/login-screen", {username: req.body.username, errors: "Username is mandatory"})
            return
        }
        else if (req.body.password === ''){
            res.render("login/login-screen", {username: req.body.username, errors: "Password is mandatory"})
            return
        }
        user = await userSchema.findOne({username: req.body.username})
        if (user){
            if (user.password === req.body.password){
                res.redirect(`/users/${req.body.username}`)
                return
            }
            else{
                res.render("login/login-screen", {username: req.body.username, errors: "Username or Password is incorrect"})
                return
            }
        }
        else{
            res.render("login/login-screen", {username: req.body.username, errors: "No such user exists"})
            return
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/add-user', async (req, res) => {
    try{
        const U = await userSchema.findOne({username: req.body.username})
    
        if (U){
            res.render("login/add-user", {username: req.body.username, errors: "This username already exists"})
            return
        }
        else{
            if (req.body.username === ''){
                res.render("login/add-user", {username: req.body.username, errors: "Username is mandatory"})
                return
            }
            else if (req.body.password === ''){
                res.render("login/add-user", {username: req.body.username, errors: "Password is mandatory"})
                return
            }
            const User = new userSchema({
                username: req.body.username,
                password: req.body.password,
            })
        
            try{
                const newUser = User.save()
                res.redirect(`/users/${req.body.username}`)
                return
            }
            catch(err){
                res.status(400).json({message: err.message})
                return
            }
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router