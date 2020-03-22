const db = require('../config/database');
const models = require('../models/index');

db.sync()
    .then(() => console.log('Nice! Database looks fine'))
    .catch(err => console.log(err, "Something went wrong with the Database Update!"));
