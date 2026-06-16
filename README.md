# SaaS Template

Basic SaaS boilerplate with authentication, dashboard, and payment placeholder.

## Architecture

```
saas-template/
├── src/
│   ├── index.js           # Main Express server
│   ├── routes/
│   │   ├── auth.js        # /login, /register, /logout
│   │   ├── dashboard.js   # Protected routes /dashboard/*
│   │   └── payment.js     # /payment/plans, /payment/checkout
│   └── views/
│       ├── layout.ejs     # Base template
│       ├── login.ejs      # Login form
│       ├── register.ejs   # Registration form
│       ├── dashboard.ejs  # User dashboard
│       ├── settings.ejs   # Account settings
│       └── plans.ejs      # Pricing plans
├── nginx/
│   └── nginx.conf         # Reverse proxy config
├── docker-compose.yml     # Docker services
└── Dockerfile             # App container
```

## Components

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Backend | Express.js | HTTP server, routing |
| Auth | JWT + bcrypt | Token-based authentication |
| DB | SQLite (in-memory) | User storage (replace for production) |
| Views | EJS | Server-side templates |
| Container | Docker | App isolation |
| Proxy | nginx | SSL termination, reverse proxy |

## Quick Start

```bash
# Install
npm install

# Run locally
npm run dev

# Docker
docker-compose up -d
```

## Environment

```env
JWT_SECRET=your-secret-key
PORT=3000
```

## Production Checklist

- [ ] Replace SQLite with PostgreSQL
- [ ] Add Redis for sessions
- [ ] Configure SSL certificates (mkcert or Let's Encrypt)
- [ ] Set real JWT secret
- [ ] Integrate Stripe/PayPal in `/payment/checkout`
- [ ] Add rate limiting
- [ ] Configure logging/monitoring