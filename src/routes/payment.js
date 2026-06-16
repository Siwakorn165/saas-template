import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

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

// Plans page
router.get('/plans', requireAuth, (req, res) => {
  const plans = [
    { id: 'free', name: 'Free', price: 0, features: ['Basic access', 'Email support'] },
    { id: 'pro', name: 'Pro', price: 29, features: ['All features', 'Priority support', 'API access'] },
    { id: 'enterprise', name: 'Enterprise', price: 99, features: ['Custom features', '24/7 support', 'SLA'] }
  ]
  res.render('plans', { user: req.user, plans })
})

// Checkout (placeholder - integrate Stripe later)
router.post('/checkout', requireAuth, (req, res) => {
  const { plan } = req.body
  // TODO: Integrate Stripe checkout
  res.json({
    message: `Plan ${plan} selected - Stripe integration pending`,
    plan,
    status: 'placeholder'
  })
})

export default router