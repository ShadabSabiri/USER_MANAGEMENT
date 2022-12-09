const express=require('express');
const mysqlConnection=require('../connection/connection');
const ExpressError = require('../utils/ExpressError');

const router=express.Router();

router.get('/',(req,res)=>{
    mysqlConnection.query('select * from users',function(err,rows,fields){
        if(err)
        {
            // throw new Error();
        }
        console.log(rows);
        res.render('users/index',{rows})
    })
   
})



router.get('/new',(req,res)=>{
    res.render('users/new');
})


router.post('/',(req,res)=>{
    const{username,email,pass1,pass2}=req.body.user;
    if(pass1!==pass2)
    {
        req.flash('error','Password dont,t match');
         return res.redirect('users/new')
    }
    mysqlConnection.query("insert into users values(?,?,?)",[username,email,pass1],function(err,rows,fields){
        if(err)
        {
            // throw new Error();
        }
        req.flash('success',`${username} Successfully added as user`);
        return res.redirect('/users')
    })
   
})

router.get('/:mail',(req,res)=>{
    const{mail}=req.params;
    mysqlConnection.query("select * from users where email=?",[mail],function(err,rows,fields){
        if(err)
        {
            throw new Error();
        }
        console.log(rows);
        res.render('users/show',{rows})
    })
   
})


router.get('/:mail/edit',(req,res)=>{
    const{mail}=req.params;
    mysqlConnection.query("select * from users where email=?",[mail],function(err,rows,fields){
        if(err)
        {
            throw new Error();
        }
        console.log(rows);
        res.render('users/edit',{rows})
    })
   
})

router.post('/:mail',(req,res)=>{

    const{username,pass1,pass2,email}=req.body.user;
    {
        if(pass1!==pass2)
        {
            req.flash('error',"Password don't Match");
            return res.redirect(`${email}/edit`)
        }
    }
    mysqlConnection.query('update users set username=? , password=? where email=?',[username,pass1,email],function(err,rows,fields){
        if(err)
        {
            req.flash('error','Something went wrong')
        }
        else{ 
        req.flash('success',`${username} Successfully Updated`);
        }
        return res.redirect(`${email}/edit`)
    })
   
})


router.post('/:mail/delete',(req,res)=>{
    const{mail}=req.params;
    mysqlConnection.query('delete from users where email=?',[mail],function(err,rows,fields){
        if(err)
        {
            req.flash('error','Something went wrong')
        }
        else{ 
        req.flash('success',`Successfully Deleted`);
        }
        return res.redirect('/users');
    })
   
})



module.exports=router;