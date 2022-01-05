const mongoose = require('mongoose');
const userData = require('../data/userData.json');
mongoose.connect('mongodb://localhost:27017/site')
    .then(() => { console.log(`server connected to mongoose`) })
    .catch(err => { console.log(`server not connect to mongoose err is:${err}`) })


const userSchema = new mongoose.Schema({
    "username": {
        type: String,
        unique: true,
        required: true,
        minlength:2,

    },
    "password": {
        type: String,
        required: true,
        min:8,
        lowercase:true,
        uppercase:true
    },
    "firstName": {
        type:String,
        required: true,
        minlength:2,
        maxlength:30
    },

    "lastName":{
        type:String,
        required: true,
        minlength:2,
        maxlength:30,
    },
    "gender": String
});




const User = mongoose.model('User', userSchema);

// Creat userData in mongoose
async function creatUser() {

    User.insertMany(userData, (err, data) => {
        if (err) {
            console.log(`can not insert:${err}`);
        }
        else {
            console.log(data);
        }
    });

}
creatUser();



// async function creatUser(){
// const user=new User({
//     "username": "awdad",
//     "password": "12A345678",
//     "firstName": "ali",
//     "lastName": "goli",
//     "gender": "mail"
// })
// try{
//     const result=await user.save();
//     console.log(result);
// }
// catch(err){
//     console.log(`err of creating new user:${err}`);
// }

// }
// creatUser();




// User.deleteMany({})
// .then(()=>console.log(`del ok`))
// .catch(err=>console.log(`not del`))

module.exports = User;