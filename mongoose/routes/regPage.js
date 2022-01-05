const express = require('express');
const router = express.Router();
const UserCollection = require('../modules/module');

const { body, validationResult } = require('express-validator');







router.get('/', (req, res) => {
    res.render('registerPage');
})

router.post('/', [
    body('username').notEmpty().withMessage( "userName is empty").isLength({min:2}).withMessage('username must be at least 2 charcator'),
    body('password').notEmpty().withMessage( "password is empty").isLength({min:8}).withMessage('password must be at least 8 charcator'),
    body('firstName').notEmpty().withMessage( "firstName is empty").isLength({min:2,max:30}).withMessage('firstname must be between 2-30'),
    body('lastName').notEmpty().withMessage( "lastName is empty").isLength({min:2,max:30}).withMessage('lastname must be between 2-30')
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).send(error);
    }
    const checkReg = async () => {
        try {
            const result = await UserCollection.find({ username:req.body.username})
            console.log(`result is :${result}`);
            if (result=="") {
                UserCollection.insertMany(req.body)
                .then(()=>{return res.render('regCompleted');})
                .catch(err=>console.log(`err of inserting new user:${err}`))
                 
            }
            else{
               return res.render('errorPage',{error:'user with this info already existed'});
            }
        }
        catch (err) {
            console.log(`not found err:${err}`);
        }


    }
    checkReg();
});









module.exports = router;