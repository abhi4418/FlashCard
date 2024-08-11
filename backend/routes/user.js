const express = require("express") ;
const router = express.Router() ;
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() ;

router.get('/bulk' , async (req,res)=>{
    try{
        const allFlashCards = await prisma.card.findMany({}) ;
        res.json(allFlashCards) ;
    }
    catch(err){
        res.status(500).send("Error in fetching flashcards") ;
    }
})

module.exports = router ;