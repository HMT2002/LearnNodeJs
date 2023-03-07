const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const connect = async () => {
  try {
    await mongoose.connect(DB, {}).then((con) => {
      console.log('Mongo connected! ');
      //console.log(con.connections);
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { connect };
