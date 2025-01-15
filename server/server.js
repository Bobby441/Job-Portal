import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";

// configure the env file
config()

// initialize express
const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// database connection
await connectDB()

// routes
app.get('/', (req, res) => {
  res.send('API working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


const port = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})