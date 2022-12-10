import express from 'express'
import applicationError from './controllers/errorHandlerController.js'
import productRoute from './routes/productsRoutes.js'
import usertRoute from './routes/userRoute.js'
import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())


// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin" , "*")
//     next()
// })

app.use('/api/v1/product' , productRoute)
app.use('/api/v1/user' , usertRoute)
app.use (applicationError)

export default app