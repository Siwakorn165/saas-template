import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

// Auth middleware
const requireAuth = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.redirect('/login')
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.clearCookie('token').redirect('/login')
  }
}

// Dashboard (protected)
router.get('/', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.user })
})

// Settings
router.get('/settings', requireAuth, (req, res) => {
  res.render('settings', { user: req.user })
})

export default router