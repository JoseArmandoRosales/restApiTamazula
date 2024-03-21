import { Router } from 'express'

export const landingRouter = Router()

landingRouter.get('/', (req, res)=>{
    res.json({ message: 'HelloWorld' })
})