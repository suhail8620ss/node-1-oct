const mongoose = require('mongoose');

async function connection() {
     try {
          mongoose.connect('mongodb://localhost:27017/batch3-30');
          console.log("Data base connected successfully...")
     } catch (err) {

     }
}

module.exports = connection;