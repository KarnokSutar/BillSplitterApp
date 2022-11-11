const { application } = require('express');
const express = require('express');
const userRouter = require('./src/routers/users')
const groupRouter = require('./src/routers/groups')
const billRouter = require('./src/routers/bills')
const friendsRouter = require('./src/routers/friends')
const dashBoardRouter = require('./src/routers/dashboard')
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('./src/db/mongoose')
const port = process.env.PORT || 5000


// app.use(taskRouter)



// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();


// Must first load the models
require('./src/models/user');

// Pass the global passport object into the configuration function
require('./src/lib/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js

app.use(userRouter)
app.use(groupRouter)
app.use(billRouter)
app.use(dashBoardRouter)
app.use(friendsRouter)

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
