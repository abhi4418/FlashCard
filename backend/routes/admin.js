const express = require("express") ;
const router = express.Router() ;
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() ;

router.post('/addFlashcard' , async (req , res)=>{
    const {content , answer} = req.body ;
    try{
        const newFlashcard = await prisma.card.create({
            data: {
                content,
                answer
            }
        })

        res.json(newFlashcard) ;
    }
    catch(err){
        res.status(500).send("Error in creating flashcard") ;
    }
})

router.get('/bulk' , async (req , res)=>{
    try{
        const allFlashCards = await prisma.card.findMany({}) ;
        res.json(allFlashCards) ;
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error in fetching flashcards") ;
    }
})

router.put('/update/:id' , async (req , res)=>{
    const {id} = req.params ;
    const {content , answer} = req.body ;
    try{
        const updatedFlashcard = await prisma.card.update({
            where: {
                id: parseInt(id)
            },
            data: {
                content,
                answer
            }
        })

        res.json(updatedFlashcard) ;
    }
    catch(err){
        res.status(500).send("Error in updating flashcard") ;
    }
})

router.delete('/delete/:id' , async (req , res)=>{
    const {id} = req.params ;
    try{
        const deletedFlashcard = await prisma.card.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json(deletedFlashcard) ;
    }
    catch(err){
        res.status(500).send("Error in deleting flashcard") ;
    }
})

module.exports = router ;