const express = require('express');
const router = express.Router();
const UserCollection = require('../modules/module');

const { body, validationResult } = require('express-validator');

const resultObj={};





router.get('/', (req, res) => {
    res.render('loginPage');
})

router.post('/', [
    body('userName', "userName is empty").notEmpty(),
    body('password', "password is empty").notEmpty(),
], (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).send(error);
    }

    const checkLogin = async () => {

        try {
            const result = await UserCollection.find({ $and: [{ username: req.body.userName }, { password: req.body.password }] })
            console.log(result);
            console.log(req.body);
            if (result.length==0) {
                 return res.render('errorPage',{error:'Not Found'});
            }
            else{
                resultObj.username=result[0].username
                resultObj.firstName=result[0].firstName
                resultObj.lastName=result[0].lastName
               return res.render('userPage',{userData:JSON.stringify(resultObj)});
            }
        }
        catch (err) {
            console.log(`not found err:${err}`);
        }


    }
    checkLogin();
});







module.exports = router;