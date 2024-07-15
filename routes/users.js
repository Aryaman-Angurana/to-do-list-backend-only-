const express = require('express')

const router = express.Router()

const userSchema = require('../models/users')

router.get('/', (req, res) => {
    res.send("UserScreen")
})

router.get('/:name/add-content', (req, res) => {
    res.render("users/add-content", { username: req.params.name })
})


router.post('/:name/add-content', async (req, res) => {
    if (req.body.item1 === '') {
        res.render("users/add-content", { username: req.params.name, errors: "The items value can't be an empty string" })
        return;
    }
    try {
        const user = await userSchema.findOne({ username: req.params.name })
        if (user) {
            user.items.push(req.body.item1);
            user.additional_info.push(req.body.add_inf)
            const new_user = user.save()
            res.redirect(`/users/${req.params.name}`)
            return
        }
        else {
            res.render("not_found")
            return;
        }
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

router.post('/:name/del-content/:i', async(req, res) => {
    try {
        const user = await userSchema.findOne({ username: req.params.name })
        if (user) {
            user.items.splice(req.params.i, 1);
            user.additional_info.splice(req.params.i, 1);
            const new_user = user.save()
            res.redirect(`/users/${req.params.name}`)
            return
        }
        else {
            res.render("not_found")
            return;
        }
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

router.get('/:name', async (req, res) => {
    try {
        const user = await userSchema.findOne({ username: req.params.name })
        if (user) {
            res.render("users/user-page", { items: user.items, additional_info: user.additional_info, username: user.username })
        }
        else {
            res.render("not_found")
            return;
        }
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
})

module.exports = router