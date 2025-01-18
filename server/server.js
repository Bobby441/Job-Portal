import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// configure the env file
config()

// initialize express
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// database connection
await connectDB()
await connectCloudinary()

// routes
app.get('/', (req, res) => {
  res.send('API working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks)

// company routes
app.use('/api/company', companyRoutes)

// job routes
app.use('/api/jobs', jobRoutes)

// user routes
app.use('/api/users', userRoutes)

const port = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})