# EPO Seconhand Shop

This project use MERN stack to build a secondhand platform, where users can register as sellers and trade their belogings. Site is managed by admins, guests only can sign up as either "seller" or "buyer".

## Main stack
![React](https://img.shields.io/badge/React-v.18-grey?labelColor=blue)
![React-Redux](https://img.shields.io/badge/React--Redux-v.8-grey?labelColor=purple)
![SASS](https://img.shields.io/badge/SASS-v.1-grey?labelColor=hotpink)
![react-hook-form](https://img.shields.io/badge/react--hook--form-v.7-grey?labelColor=hotpink)
![Nodejs](https://img.shields.io/badge/Nodejs-v.16-grey?labelColor=green)
![Express](https://img.shields.io/badge/Express-v.4-grey?labelColor=red)
![Passport](https://img.shields.io/badge/PassportJs-v.0-grey?labelColor=blue)
![Jest](https://img.shields.io/badge/Jest-v.28-grey?labelColor=orrange)
![Stripe](https://img.shields.io/badge/Stripe-v.10-grey?labelColor=yellowgreen)
![SendGrid](https://img.shields.io/badge/SendGrid-v.7-grey?labelColor=hotpink)
![mongoose](https://img.shields.io/badge/mongoose-v.7-grey?labelColor=yellow)

## Project structure

1. api folder - backend
<pre>
├── global.d.ts
├── jest.config.js
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   ├── features
│   │   ├── carts
│   │   ├── categories
│   │   ├── cities
│   │   ├── images
│   │   ├── mails
│   │   ├── productReviews
│   │   ├── products
│   │   ├── stripe
│   │   ├── userReviews
│   │   └── users
│   ├── fixtures
│   ├── helpers
│   ├── middlewares
│   ├── server.ts
│   └── util
├── tsconfig.json
</pre>
2. client folder - frontend
<pre>
├── package.json
├── public
├── src
│   ├── App.tsx
│   ├── axios
│   ├── components
│   ├── hooks
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   ├── reportWebVitals.ts
│   ├── router
│   ├── setupTests.ts
│   ├── styles
│   └── types
├── test
└── tsconfig.json
</pre>
## Key features

* Common features for all users
  * Login
  * Register
  * Buy products / Update products in cart
  * Modify account info (except email)
  * Delete own account
* Typical features for sellers
  * CRUD operations for own products
* Typical features for admins
  * Manage all products, users, carts, and other information

## How to use

`git clone`
Clone the repo into your all local machine

- In each folder, run `npm install` to add all the independencies. Check other scripts in the package.json files.
- In api folder, create .env file with the key-pair values
  - MONGODB_URI *MongoDB database*
  - JWT_SECRET *jwt secret string to encrypt/decrypt data*
  - STRIPE_API_SECRET_TEST *stripe api to enable payment service*
  - STRIPE_WEBHOOK *stripe webhook to listen to payment event*
  - SENDGRID_API_KEY *sengrid api key to send email*
  - SENDER *sender email in sendgrid*
  - GOOGLE_CLIENT_ID *Google client id to verify login with google*
  - GOOGLE_CLIENT_SECRET *Google client secret to verify login with google*
  - PORT *port to run express server locally*
