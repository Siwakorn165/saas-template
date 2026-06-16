import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'
const db = new sqlite3.Database(':memory:')

// Initialize users table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  plan TEXT DEFAULT 'free',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`)

// Login page
router.get('/login', (req, res) => {
  res.render('login', { error: null, title: 'Login' })
})

// Register page
router.get('/register', (req, res) => {
  res.render('register', { error: null, title: 'Register' })
})

// Handle registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.render('register', { error: 'All fields required' })
  }
  const hashed = await bcrypt.hash(password, 10)
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed], function(err) {
    if (err) return res.render('register', { error: 'Email already exists' })
    res.redirect('/login')
  })
})

// Handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user.id, email, plan: user.plan }, JWT_SECRET)
    res.cookie('token', token, { httpOnly: true }).redirect('/dashboard')
  })
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').redirect('/login')
})

export default router