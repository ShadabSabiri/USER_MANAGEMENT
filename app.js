const express=require('express');
const path=require('path');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const mysqlConnection=require('./connection/connection')
const userRoutes=require('./routes/users')
const ExpressError=require('./utils/ExpressError')
const app=express();




app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const sessionConfig = {
    secret: 'usersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());





app.use((req, res, next) => {
    
    console.log(req.session)
    // res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})






app.use('/users',userRoutes);

app.use('/',(req,res)=>{
    res.render('home');
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})
app.listen(3000,()=>{
    console.log("Listening at port 3000");
})