// Import dependancies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet')

// Import My dependancies
const AppError = require('./src/utils/AppError');
const errorHandler = require('./src/utils/errorHandler');

// Fire The app
const app = express();

// App Configuration
require('dotenv').config()
app.set('env', 'development');  // production
app.set('view cache', false); // Set to true in production
app.set('x-powered-by', false);
app.set('trust proxy', true);
app.set('views', path.join(__dirname), 'src', 'templates', 'views');
app.set('port', process.env.PORT || 3000);

// Use Midlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Import routes
const helloRoute = require('./src/routes/helloRoute')


// Your routes here
app.use('/', helloRoute)


// Error Handling
app.use((req, __, next) => {
    next(new AppError("Page Not found", 404, "Getting " + req.originalUrl));
})

app.use(errorHandler)

process
.on('unhandledRejection', (err, p) => {
    console.error(err, 'Unhandled Rejection at Promise', p);

})
.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1)
})

// App running
const server = app.listen(app.get('port'), () => {
    console.log("Server is running on http://localhost:" + app.get('port'));
})