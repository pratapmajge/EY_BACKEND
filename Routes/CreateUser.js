const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const jwtSecret="pratapmajgehfjfjfhfbdndggg"
router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 4 }),
        body('password', "enter more than 5 characters").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        let secPassword= await bcrypt.hash( req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', "enter more than 5 characters").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({ email }) // ✅ Fixed here

            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with the correct email" })
            }
            const pwdCompare=await bcrypt.compare(req.body.password, userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect password" })
            }

            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true , authToken:authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

module.exports = router
