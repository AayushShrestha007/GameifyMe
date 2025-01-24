//importing the package (express)
const express = require('express');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');
const cors = require('cors');
const acceptFormData = require('express-fileupload')
const bodyParser = require("body-parser")


//creating an express application
const app = express();

//configure cors policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(acceptFormData());

//Express Json Config
app.use(express.json());
app.use(bodyParser.json());


//make a static public folder
app.use(express.static("./public"))

//dotenv configuration
dotenv.config();

// connecting to database
connectDatabase();

//Using the port defined in env
const PORT = process.env.PORT;

//Making a test endpoint
//Endpoints: POST, GET, PUT, DELETE

app.get('/test', (req, res) => {
    res.send("Test API is working");
})


// configuring routes 
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/gameOption', require('./routes/gameOptionRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))
app.use('/api/order', require('./routes/orderRoutes'))
app.use('/api/khalti', require('./routes/paymentRoutes'))
app.use('/api/email', require('./routes/emailRoutes'))

//Starting the server
app.listen(PORT, () => {
    console.log(`server is now running on port ${PORT}!`);
})

module.exports = app;