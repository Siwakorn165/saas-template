import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import expressLayouts from 'express-ejs-layouts'
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import paymentRoutes from './routes/payment.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layout')

// Routes
app.use('/', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/payment', paymentRoutes)

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

// 404 handler
app.use((req, res) => res.status(404).render('error', { message: 'Page not found' }))

app.listen(PORT, () => {
  console.log(`SaaS Template running on port ${PORT}`)
})