const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi')
const logger = require('./middleware/logger.js');
const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require ('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(morgan('tiny'));
app.use('/', home)
app.use('/api/courses', courses)

//app.get()
//app.post()
//app.put()
//app.delete()










app.listen(3000, () => {
    console.log('listening on port 3000')
})