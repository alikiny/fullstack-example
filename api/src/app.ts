import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import session from "express-session"
import cookieParser from "cookie-parser"
import imageRoute from './features/images/imageRoute'
import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import addressRoute from './features/addresses/addressRoute'
import cityRoute from './features/cities/cityRoute'
import categoryRoute from './features/categories/categoryRoute'
import userRoute from './features/users/userRoute'
import userReviewRoute from './features/userReviews/userReviewRoute'
import productRoute from './features/products/productRoute'
import productReviewRoute from './features/productReviews/productReviewRoute'
import cartRoute from './features/carts/cartRoute'
import { googleStrategy, jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)
app.set('trust proxy', 1)

// Global middleware

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}
))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "secret"
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, cb) {
    return cb(null, user)
});

passport.deserializeUser(function (user: any, cb) {
    return cb(null, user);
})
passport.use(googleStrategy)
passport.use(jwtStrategy)

// Set up routers
app.use('/api/v1/addresses', addressRoute)
app.use('/api/v1/images', imageRoute)
app.use('/api/v1/cities', cityRoute)
app.use('/api/v1/categories', categoryRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/userReviews', userReviewRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/productReviews', productReviewRoute)
app.use('/api/v1/carts', cartRoute)

// Custom API error handler
app.use(apiErrorHandler)

export default app
