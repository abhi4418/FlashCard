const express = require("express") ;
const app = express() ;
const cors = require('cors') ;

app.use(cors()) ;
const userRouter = require('./routes/user') ;
const adminRouter = require('./routes/admin') ;

app.use(express.json()) ;
app.use('/user' , userRouter) ;
app.use('/admin' , adminRouter) ;

app.get('/' , (req,res)=>{
    res.send("Health Check")
})

app.listen(3000 , ()=>{
    console.log(`Running on http://localhost:3000`) ;
})