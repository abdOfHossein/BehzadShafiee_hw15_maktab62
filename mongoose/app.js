const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const loginPageRoute = require('./routes/loginPageRoute');
const regPageeRoute = require('./routes/regPage');
const path = require('path');

const usercollection=require('./modules/module');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"))


app.use('/login', loginPageRoute);
app.use('/reg', regPageeRoute);
app.use('/', usercollection);


app.listen(port, () => {
    console.log(`server is runnig on port${port}`);
})